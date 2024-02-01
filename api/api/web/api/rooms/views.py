from typing import Annotated, List
import uuid
from api.schemas.room import RoomInfo
from api.schemas.token import CredentialsTokens
from api.schemas.user import UserInfo
from api.static import static
from api.settings import settings
from api.db.dao.room_dao import RoomDAO
from api.db.dao.user_dao import UserDAO
from api.db.models.room_model import RoomModel
from fastapi import APIRouter, Depends, HTTPException, Response, status, Path
from fastapi.responses import JSONResponse
from loguru import logger

router = APIRouter()
logger = logger.bind(Task="Rooms")


def generate_credentials(user_dao: UserDAO, new_user: UserDAO) -> Response:
    access_token = user_dao.generate_access_token(new_user)
    refresh_token = user_dao.generate_refresh_token(new_user)

    response = JSONResponse({
        "access_token": access_token,
        "refresh_token": refresh_token,
    })
    response.set_cookie(
        key="access_token",
        value=access_token,
        max_age=int(static.ACCESS_TOKEN_EXPIRE_TIME.total_seconds()),
        secure=settings.is_production,
        domain=settings.domain,
        samesite="strict",
        httponly=True,
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        max_age=int(static.REFRESH_TOKEN_EXPIRE_TIME.total_seconds()),
        secure=settings.is_production,
        domain=settings.domain,
        samesite="strict",
        httponly=True,
    )

    return response



@router.post('/', response_model=CredentialsTokens)
async def create_room(
    user_dao: UserDAO = Depends(),
    room_dao: RoomDAO = Depends(),
) -> Response:
    new_room = await room_dao.create_room()
    new_user = await user_dao.create_user(new_room, is_owner=True)
    await room_dao.add_user(new_room, new_user)

    response = generate_credentials(user_dao, new_user)

    return response

@router.get('/{room_uuid}', response_model=RoomInfo)
async def room_details(
    room_uuid: Annotated[uuid.UUID, Path(title="The uuid of room.")],
    room_dao: RoomDAO = Depends(),
) -> Response:
    print(room_uuid)
    room = await room_dao.get_room(room_uuid)

    if room is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Not found Room."
        )

    room = await room_dao.get_users(room)

    return room


@router.get('/{room_uuid}/users/', response_model=List[UserInfo])
async def room_users(
    room_uuid: Annotated[uuid.UUID, Path(title="The uuid of room.")],
    room_dao: RoomDAO = Depends(),
) -> Response:
    room = await room_dao.get_room(room_uuid)

    if room is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Not found Room."
        )

    users = (await room_dao.get_users(room)).users

    return users

@router.post('/{room_uuid}/users/', response_model=CredentialsTokens)
async def create_user(
    room_uuid: Annotated[uuid.UUID, Path(title="The uuid of room.")],
    user_dao: UserDAO = Depends(),
    room_dao: RoomDAO = Depends(),
) -> Response:
    room = await room_dao.get_room(room_uuid)

    if room is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Not found Room."
        )

    new_user = await user_dao.create_user(room, is_owner=False)
    await room_dao.add_user(room, new_user)

    response = generate_credentials(user_dao, new_user)

    return response
