from pydantic import BaseModel
from typing import Annotated
from fastapi import Header, HTTPException, Depends
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
