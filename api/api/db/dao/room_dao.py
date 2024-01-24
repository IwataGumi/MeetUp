import uuid
from api.db.models.room_model import RoomModel
from fastapi import Depends
from api.db.dependencies import get_db_session
from sqlalchemy.ext.asyncio import AsyncSession


class RoomDAO:
    """Class for accessing rooms table."""

    def __init__(self, session: AsyncSession = Depends(get_db_session)):
        self.session = session

    async def create_room(self, owner_uid: uuid.UUID):
        """Add new room to the database.

        :returns: if succeed to create room, will return Room object.
        """
        pass