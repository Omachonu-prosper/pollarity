import bcrypt
from pydantic import BaseModel
from typing import Annotated
from fastapi import Header, HTTPException 
from sqlmodel import create_engine, SQLModel, Session
from config import Config

sqlite_filename = 'database.db'
sqlite_url = f'sqlite:///{sqlite_filename}'
connect_args = {'check_same_thread': False}
engine = create_engine(sqlite_url, connect_args=connect_args)


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
