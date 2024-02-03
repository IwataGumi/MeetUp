import uuid
from api.db.base import Base
from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

if TYPE_CHECKING:
    from api.db.models.room_model import RoomModel
    from api.db.models.user_model import UserModel


class RoomLinkUser(Base):
    __tablename__ = "room_link_user"

    room_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("rooms.id"),
        primary_key=True,
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id"),
        primary_key=True,
    )
    room: Mapped["RoomModel"] = relationship(
        "RoomModel", back_populates="user_associations"
    )
    user: Mapped["UserModel"] = relationship(
        "UserModel", back_populates="room_associations"
    )
