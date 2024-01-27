from fastapi import APIRouter, Response
from loguru import logger

router = APIRouter()
logger = logger.bind(Task="Token")

@router.post("/token")
async def generate_token(

) -> Response:
    pass