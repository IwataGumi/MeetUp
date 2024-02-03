from typing import List, Set
import uuid
from api.db.models.room_model import RoomModel
from api.db.models.user_model import UserModel
from api.libs.errors import NotFoundException
from api.web.ws.rooms.room import Room
from api.web.ws.rooms.send.schemas import SendContent, SendJoinRoomBody
from api.web.ws.rooms.user import User
from fastapi import WebSocket


class ConnectionManager:
    def __init__(self):
        self.rooms: List[Room] = []

    async def connect(
        self,
        username: str,
        websocket: WebSocket,
        user_model: UserModel,
        room_model: RoomModel,
    ):
        room = self.get_room_or_none(room_model.id)
        if room is None:
            room = self.create_room(room_model.id, room_model)

        user = room.get_user_or_none(user_model.id)
        if user is None:
            user = self.create_user(
                username,
                websocket,
                user_model,
                add_room=room,
            )
        else:
            user.websocket = websocket

        try:
            message_content = SendContent(
                type="join_room",
                body=SendJoinRoomBody(
                    user_id=user_model.id,
                    username=user.username,
                ).model_dump(),
            )
            await room.send_json(message_content.model_dump(), exclude_users=[user])
        except:
            pass

    async def disconnect(self, room_model: RoomModel, user_model: UserModel):
        room = self.get_room_or_none(room_model.id)
        if room is not None:
            user = room.get_user_or_none(user_model.id)
            if user is not None:
                room.leave_user(user)

    def create_room(self, room_id: uuid.UUID, room_model: RoomModel) -> Room:
        room = Room(room_id, room_model)
        self.add_room(room)
        return room

    def create_user(self, username: str, websocket: WebSocket, user_model: UserModel, add_room: Room | None = None) -> User:
        user = User(
            id=user_model.id,
            username=username,
            websocket=websocket,
            user_model=user_model,
        )

        if add_room is not None:
            add_room.add_user(user)

        return user

    def get_room(self, room_id: uuid.UUID) -> Room:
        for room in self.rooms:
            if room.id == room_id:
                return room
        raise NotFoundException("Not found room from room_id.")

    def get_room_or_none(
        self, room_uuid: uuid.UUID
    ) -> Room | None:
        try:
            return self.get_room(room_uuid)
        except NotFoundException:
            return None

    def add_room(self, room: Room) -> None:
        self.rooms.append(room)

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
