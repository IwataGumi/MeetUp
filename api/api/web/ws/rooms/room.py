from typing import Any, Dict, List, Set
import uuid
from api.db.models.room_model import RoomModel
from api.libs.errors import NotFoundException

from api.web.ws.rooms.user import User


class Room:
    def __init__(self, room_id: uuid.UUID, room_model: RoomModel):
        self.id: uuid.UUID = room_id
        self.room_model = room_model
        self.users: List[User] = []

    async def send_json(
        self, json_data: Dict[str, Any], exclude_users: List[User] = []
    ) -> None:
        for user in self.users - exclude_users:
            await user.websocket.send_json(json_data)

    async def send_text(self, text_data: str, exclude_users: List[User] = []) -> None:
        for user in self.users - exclude_users:
            await user.websocket.send_text(text_data)

    def is_there_user(self, user: User) -> bool:
        return user in self.users

    def add_user(self, user: User) -> None:
        self.users.append(user)

    def get_user(self, user_id: uuid.UUID) -> User:
        for user in self.users:
            if user.id == user_id:
                return user
        raise NotFoundException("Not found user from user_id.")

    def get_user_or_none(self, user_id: uuid.UUID) -> User | None:
        try:
            self.get_user(user_id)
        except NotFoundException:
            return None

    def leave_user(self, user: User):
        if user in self.users:
            self.users.discard(user)
