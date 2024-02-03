from typing import Annotated
import uuid
from api.db.dao.room_dao import RoomDAO
from api.db.models.user_model import UserModel
from api.dependencies.auth import ws_with_autheticate
from api.web.ws.rooms.connection_manager import ConnectionManager
from api.web.ws.rooms.receive.schemas import (
    ReceiveChatBody,
    ReceiveContent,
    ReceiveJoinRoomBody,
    ReceiveLeaveRoomBody,
)
from loguru import logger
from fastapi import APIRouter, Depends, Path, WebSocket, WebSocketDisconnect
from websockets import ConnectionClosedError

logger = logger.bind(task="ws_Rooms")

router = APIRouter()

connection_manager = ConnectionManager()


@router.websocket(path="/{room_uuid}")
async def rooms_ws(
    websocket: WebSocket,
    room_uuid: Annotated[uuid.UUID, Path(title="The uuid of room.")],
    user_model: UserModel | None = Depends(ws_with_autheticate),
    room_dao: RoomDAO = Depends(),
):
    for room in connection_manager.rooms:
        print(room.users)
    room_model = await room_dao.get_room(room_uuid)
    if user_model is None or room_model is None:
        await websocket.close()
    else:
        await websocket.accept()

    async def join_room(data: ReceiveJoinRoomBody):
        await connection_manager.connect(
            data.username, websocket, user_model, room_model
        )
        await room_dao.add_user(room_model, user_model)

    async def leave_room():
        await connection_manager.disconnect(room_model, user_model)
        await room_dao.leave_user(room_model, user_model)

    try:
        while True:
            data = await websocket.receive_text()

            try:
                data = ReceiveContent.model_validate_json(data, strict=True)

                match data.type:
                    case "join_room":
                        data.body = ReceiveJoinRoomBody.model_validate(
                            data.body, strict=True
                        )
                        await join_room(data.body)
                    case "chat":
                        data.body = ReceiveChatBody.model_validate(
                            data.body, strict=True
                        )
                    case "leave_room":
                        data.body = ReceiveLeaveRoomBody.model_validate(
                            data.body, strict=True
                        )
                        await leave_room()
                    case _:
                        raise ValueError("invalid message body type.")
            except Exception as e:
                await websocket.send_json(
                    {
                        "type": "error",
                        "detail": "Invalid message type.",
                        "data": data,
                    }
                )

    except WebSocketDisconnect as e:
        # Handle WebSocketDisconnect separately if needed
        print(f"WebSocketDisconnect: {e}")
        await connection_manager.disconnect(room_model, user_model)
    except ConnectionClosedError as e:
        # ConnectionClosedError will be caught by the exception handler
        print(f"ConnectionClosedError: {e}")
