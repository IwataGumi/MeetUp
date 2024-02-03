from datetime import datetime
from typing import Any, Dict, List, Set, Union
import uuid
from enum import Enum
from loguru import logger
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, ValidationError

logger = logger.bind(task="ws_Rooms")

router = APIRouter()


class User:
    def __init__(
        self,
        username: str,
        user_id: uuid.UUID,
        websocket: WebSocket,
    ):
        self.username = username
        self.user_id = user_id
        self.websocket = websocket


class Room:
    def __init__(self):
        self.id: uuid.UUID = uuid.UUID(as_uuid=True)
        self.users: Set[User] = {}

    def send_json(
        self, json_data: Dict[str, Any], exclude_user: Set[User] = {}
    ) -> None:
        for user in self.users:
            if user in exclude_user:
                continue
            user.websocket.send_json(json_data)

    def send_text(self, text_data: str, exclude_user: Set[User] = {}) -> None:
        for user in self.users:
            if user in exclude_user:
                continue
            user.websocket.send_text(text_data)

    def is_there_user(self, user: User) -> bool:
        return user in self.users

    def leave_user(self, user):
        pass


class ConnectionManager:
    def __init__(self):
        self.rooms: Set[Room] = {}

    def add_room(self, room: Room) -> None:
        self.rooms.add(room)

    def delete_room(self, room: Room) -> None:
        if room in self.rooms:
            self.rooms.discard(room)

    def delete_room_by_id(self, room_id: uuid.UUID) -> None:
        room = self.get_room_by_idI(room_id)
        self.delete_room(room)

    def get_room_by_id(self, uuid: uuid.UUID) -> Room | None:
        for room in self.rooms:
            if room.id == uuid:
                return room
        return None


class ChatBody(BaseModel):
    user_id: uuid.UUID
    text: str
    created_at: datetime


class JoinRoomBody(BaseModel):
    user_id: uuid.UUID
    username: str
    created_at: datetime


class LeaveRoomBody(BaseModel):
    user_id: uuid.UUID
    created_at: datetime


class SendMessageType(Enum):
    CHAT = "chat"
    JOIN_ROOM = "join_room"
    LEAVE_ROOM = "leave_room"

class SendContent(BaseModel):
    room_id: uuid.UUID
    type: SendMessageType
    body: Union[ChatBody, JoinRoomBody, LeaveRoomBody]

class ReceiveMessageType(Enum):
    CHAT = "chat"
    JOIN_ROOM = "join_room"
    LEAVE_ROOM = "leave_room"

class ReceiveContent(BaseModel):
    type: ReceiveMessageType
    user_id: uuid.UUID
    room_id: uuid.UUID
    body: Union[ChatBody, JoinRoomBody, LeaveRoomBody]


@router.websocket(path="/{room_uuid}")
async def rooms_ws(
    websocket: WebSocket,
):
    await websocket.accept()
    print(websocket.cookies)
    try:
        while True:
            data = await websocket.receive_json()
            data = ReceiveContent.model_validate_json(data, strict=True)

            await websocket.send_text(f"Message text was: {data}")
    except ValidationError:
        websocket.close(
            status=1008,
            reason="Invalid message format"
        )
    except WebSocketDisconnect:
        print("切断しました。")
