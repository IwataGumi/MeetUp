import uuid
from typing import Optional

from fastapi import Depends
from sqlalchemy.ext.asyncio import AsyncSession

from api.db.dependencies import get_db_session
from api.db.models.user_model import UserModel


class UserDAO:
    """Class for accessing users table."""

    def __init__(self, session: AsyncSession = Depends(get_db_session)):
        self.session = session

    async def create_user(self):
        """Add new user to the datebase.

        :returns: if succeed to create user, will return UserModel object.
        """
        user = UserModel()
        await self.session.commit()

        return user

    async def get_user(self, user_uuid: uuid.UUID) -> Optional[UserModel]:
        """Get user from user's uuid.

        if not found from uuid, will return None.

        :param user_uuid: uuid of user.
        :returns: UserModel, or None if not found.
        """
        user = await self.session.get(UserModel, user_uuid)
        return user
