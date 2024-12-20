from dependencies import SuccessResponse
from fastapi import APIRouter, status

router = APIRouter(
    tags=['root']
)

@router.get('/', status_code=status.HTTP_200_OK)
async def root() -> SuccessResponse:
    return SuccessResponse(
        message='pollarity api v 0.1'
    )
