from typing import Annotated, List
import uuid
from api.db.models.user_model import UserModel
from api.dependencies.auth import with_authenticate
from api.schemas.room import RoomInfo
from api.schemas.user import UserInfo
from api.db.dao.room_dao import RoomDAO
from fastapi import APIRouter, Depends, HTTPException, Response, status, Path
from loguru import logger

router = APIRouter()
logger = logger.bind(Task="Rooms")


@router.post("/", response_model=RoomInfo)
async def create_room(
    room_dao: RoomDAO = Depends(), user: UserModel = Depends(with_authenticate)
) -> Response:
    new_room = await room_dao.create_room(owner_user=user)
    new_room = await room_dao.get_users(new_room)

    return new_room


@router.get("/{room_uuid}", response_model=RoomInfo)
async def room_details(
    room_uuid: Annotated[uuid.UUID, Path(title="The uuid of room.")],
    room_dao: RoomDAO = Depends(),
) -> Response:
    room = await room_dao.get_room(room_uuid)

    if room is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not found Room."
        )

    room = await room_dao.get_users(room)

    return room


# TODO: Websocketで実装する予定のため、廃止予定
@router.get("/{room_uuid}/users/", response_model=List[UserInfo])
async def get_room_users(
    room_uuid: Annotated[uuid.UUID, Path(title="The uuid of room.")],
    room_dao: RoomDAO = Depends(),
) -> Response:
    room = await room_dao.get_room(room_uuid)

    if room is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not found Room."
        )

    users = (await room_dao.get_users(room)).users

    return users


# TODO: Websocketで実装する予定のため、廃止予定
@router.post("/{room_uuid}/users/", response_model=RoomInfo)
async def join_room(
    room_uuid: Annotated[uuid.UUID, Path(title="The uuid of room.")],
    room_dao: RoomDAO = Depends(),
    user: UserModel = Depends(with_authenticate),
) -> Response:
    room = await room_dao.get_room(room_uuid)

    if room is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Not found Room."
        )

    await room_dao.add_user(room, user)
    room = await room_dao.get_users(room)

    return room
