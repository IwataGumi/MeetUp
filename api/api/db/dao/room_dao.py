import uuid
from typing import List
from api.db.models.room_model import RoomModel
from api.db.models.user_model import UserModel
from fastapi import Depends
from api.db.dependencies import get_db_session
from sqlalchemy.ext.asyncio import AsyncSession


class RoomDAO:
    """Class for accessing rooms table."""

    def __init__(self, session: AsyncSession = Depends(get_db_session)):
        self.session = session

    async def create_room(self):
        """Add new room to the database.

        :returns: if succeed to create room, will return Room object.
        """
        room = RoomModel()
        self.session.add(room)
        await self.session.flush()

        return room

    async def get_room(self, room_uuid: uuid.UUID) -> RoomModel | None:
        """Get user from user's uuid.

        if not found from uuid, will return None.

        :param user_uuid: uuid of user.
        :returns: UserModel, or None if not found.
        """
        user = await self.session.get(RoomModel, room_uuid)
        return user

    async def add_user(self, room: RoomModel, user: UserModel) -> None:
        await self.session.refresh(room, attribute_names=["users"])
        room.users.append(user)

    async def leave_user(self, room: RoomModel, user: UserModel) -> None:
        await self.session.refresh(room, attribute_names=["users"])
        if user in room.users:
            room.users = [u for u in room.users if u != user]

    async def add_user_by_uuid(self, room_uuid: uuid.UUID, user: UserModel) -> None:
        room = await self.get_room(room_uuid)
        await self.session.refresh(room, attribute_names=["users"])
        room.users.append(user)

    async def get_users(self, room: RoomModel) -> RoomModel:
        await self.session.refresh(room, attribute_names=["users"])
        return room

    async def get_users_by_uuid(self, room_uuid: uuid.UUID) -> RoomModel:
        room = await self.get_room(room_uuid)
        await self.session.refresh(room, attribute_names=["users"])
        return room
