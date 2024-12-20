from pydantic import BaseModel

class SuccessResponse(BaseModel):
    message: str
    error: bool = False
    data: None | list | dict = None


class ErrorResponse(BaseModel):
    message: str
    error: bool = True
