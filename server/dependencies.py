from pydantic import BaseModel
from typing import Annotated
from fastapi import Header, HTTPException
from config import Config

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
