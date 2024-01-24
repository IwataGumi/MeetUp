from fastapi import APIRouter
from loguru import logger

router = APIRouter()
logger = logger.bind(Task="Rooms")


@router.post('/')
async def create_room():
    pass

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
