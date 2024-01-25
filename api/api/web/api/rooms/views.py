from api.dependencies.auth import with_authenticate
from fastapi import APIRouter, Depends
from loguru import logger

router = APIRouter()
logger = logger.bind(Task="Rooms")


@router.get('/')
async def create_room(
    user = Depends(with_authenticate)
):
    return user

@router.post('/{room_uid}/users/')
async def create_user():
    pass

# TODO: socketio でやるかも？
# @router.delete('/{room_uid}/users/')
# async def leave_user():
#     pass

@router.get('/{room_uid}/users/')
async def room_users():
    pass
