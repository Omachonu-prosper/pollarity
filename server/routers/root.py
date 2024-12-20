from dependencies import SuccessResponse
from fastapi import APIRouter

router = APIRouter()

@router.get('/')
async def root():
    return SuccessResponse(
        message='pollarity api v 0.1'
    )
