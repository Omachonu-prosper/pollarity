import bcrypt, jwt, uuid
from datetime import datetime, timedelta, timezone
from pydantic import BaseModel
from typing import Annotated
from fastapi import Header, HTTPException, status, Depends
from sqlmodel import create_engine, SQLModel, Session, select
from models import User
from config import Config

# Database Configurations 
db_url = Config.DB_URL
connect_args = {'check_same_thread': False}
engine = create_engine(db_url, connect_args=connect_args)

# Voting Configurations
poll_connections = dict()


class SuccessResponse(BaseModel):
    message: str
    error: bool = False
    data: None | list | dict = None


class ErrorResponse(BaseModel):
    message: str
    error: bool = True


async def validate_api_key(x_api_key: Annotated[str, Header()]):
    if x_api_key != Config.API_KEY:
        raise HTTPException(status_code=400, detail='X-API-KEY header invalid')


def create_db_and_table():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))


def generate_poll_ref() -> str:
    return str(uuid.uuid4().hex)


def timestamp() -> str:
    return datetime.now()


def generate_session_id() -> str:
    return str(uuid.uuid1().hex)


async def create_access_token(user_id: int | None):
    to_encode = {
        'user_id': user_id,
        'token_type': 'ACCESS_TOKEN',
        'exp': datetime.now(timezone.utc) + timedelta(minutes=Config.ACCESS_TOKEN_EXPIRE_MINS)
    }
    token = jwt.encode(to_encode, Config.SECRET_KEY, algorithm=Config.JWT_ALGORITHM)
    return token


async def verify_access_token(
        authorization: Annotated[str, Header()],
        session : Session = Depends(get_session)
    ) -> User:
    if not authorization.startswith('Bearer'):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='missing Bearer in authorization header'
        )
    header_str_split = authorization.split(' ')
    if len(header_str_split) != 2:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='invalid authorization header format'
        )
    try:
        token = header_str_split[1]
        payload = jwt.decode(token, Config.SECRET_KEY, algorithms=[Config.JWT_ALGORITHM])
        uid = payload['user_id']
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='authorization token expired'
        )
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='access token could not be verified'
        )
    query = select(User).where(User.id == uid)
    user = session.exec(query).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='User not found'
        )
    return user
