from typing import Annotated, Literal
import uuid
from api.db.dao.room_dao import RoomDAO
from api.db.models.user_model import UserModel
from api.dependencies.auth import with_authenticate
from loguru import logger
from fastapi import APIRouter, Depends, HTTPException, Path, status, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, ValidationError

logger = logger.bind(task="ws_Rooms")

router = APIRouter

class Command(BaseModel):
    type: Literal["change_name", "webrtc_sdp", "webrtc_ice"]

class JoinCommand(Command):
    type: Literal["change_name"]
    username: str

class WebRTCSdpCommand(Command):
    type: Literal["webrtc_sdp"]
    description: str
    src: str

class WebRTCIceCommand(Command):
    type: Literal["webrtc_ice"]
    candidate: str
    str: str


@router.websocket("/{room_uuid}")
async def rooms_ws(
    websocket: WebSocket,
    room_uuid: Annotated[uuid.UUID, Path(title="The uuid of room.")],
    room_dao: RoomDAO = Depends(),
    user: UserModel = Depends(with_authenticate),
):
    room = await room_dao.get_room(room_uuid)

    if room is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Not found Room."
        )
    room = await room_dao.get_users(room)

    await room_dao.add_user(room, user)

    await websocket.accept()

    try:
        while True:
            data = await websocket.receive_json()

            try:
                command = Command.model_validate_json(data)

                match command.type:
                    case 'change_name':
                        break
                    case 'webrtc_ice':
                        break
                    case 'webrtc_sdp':
                        break
            except ValidationError as e:
                logger.warning(f"Unknown command type received: {data}")
    except WebSocketDisconnect:
        await room_dao.leave_user(user)
        print('接続が切断されました。')






    