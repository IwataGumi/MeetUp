from typing import List
import uuid
from api.db.models.user_model import UserModel

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from api.db.base import Base


class RoomModel(Base):

    __tablename__ = "rooms"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), unique=True, primary_key=True, default=uuid.uuid4
    )
    users: Mapped[List[UserModel]] = relationship("UserModel", backref="users")
