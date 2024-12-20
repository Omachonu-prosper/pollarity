from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel import Session, select
from models import UserPublic, UserCreate, User, UserAuthenticate
from dependencies import get_session, SuccessResponse

router = APIRouter(
    tags=['users']
)


@router.post('/user/signup', status_code=status.HTTP_201_CREATED)
async def signup(
        user: UserCreate,
        session: Session = Depends(get_session)
    ) -> SuccessResponse:
    db_user = User.model_validate(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    user_public = UserPublic.model_validate(db_user)
    return SuccessResponse(
        message='User created successfully',
        data=user_public.model_dump()
    )


@router.post('/user/login', status_code=status.HTTP_200_OK)
async def login(
        user: UserAuthenticate,
        session: Session = Depends(get_session)
    ) -> SuccessResponse:
    password = user.password
    email = user.email
    statement = select(User).where(User.password == password).where(User.email == email)
    db_user = session.exec(statement).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid credentials'
        )
    user_public = UserPublic.model_validate(db_user)
    return SuccessResponse(
        message='Logged in successfully',
        data=user_public.model_dump()
    )
