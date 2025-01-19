from fastapi import APIRouter, Depends, status, HTTPException
from sqlmodel import Session, select
from models import UserPublic, UserCreate, User, UserAuthenticate
from dependencies import get_session, SuccessResponse, hash_password, verify_password, create_access_token, verify_access_token

router = APIRouter(
    tags=['users']
)


@router.post('/user/signup', status_code=status.HTTP_201_CREATED)
async def signup(
        user: UserCreate,
        session: Session = Depends(get_session)
    ) -> SuccessResponse:
    db_user = User.model_validate(user)
    db_user.password = hash_password(db_user.password)
    try:
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
    except Exception as e:
        if 'user.username' in e:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail='Username taken'
            )
        elif 'user.email' in e:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail='Email taken'
            )
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='An error occured when attemptig to sign you up!'
        )
    user_public = UserPublic.model_validate(db_user)
    return SuccessResponse(
        message='User created successfully',
        data={
            'user_details': user_public.model_dump(),
            'access_token': await create_access_token(db_user.id)
        }
    )


@router.post('/user/login', status_code=status.HTTP_200_OK)
async def login(
        user: UserAuthenticate,
        session: Session = Depends(get_session)
    ) -> SuccessResponse:
    password = user.password
    email = user.email
    statement = select(User).where(User.email == email)
    db_user = session.exec(statement).first()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail='User not found'
        )
    if not verify_password(password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid credentials'
        )
    user_public = UserPublic.model_validate(db_user)
    return SuccessResponse(
        message='Logged in successfully',
        data={
            'user_details': user_public.model_dump(),
            'access_token': await create_access_token(db_user.id)
        }
    )


@router.get('/user/polls', status_code=status.HTTP_200_OK)
async def user_polls(
        user: User = Depends(verify_access_token),
    ) -> SuccessResponse:
    return SuccessResponse(
        message='User polls fetched successfully',
        data=user.polls
    )

