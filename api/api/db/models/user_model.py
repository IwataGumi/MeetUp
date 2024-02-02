import uuid

from sqlalchemy import Boolean, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from api.db.base import Base

class UserModel(Base):

    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), unique=True, primary_key=True, default=uuid.uuid4
    )
    is_owner: Mapped[bool] = mapped_column(Boolean, default=False)
    room_id = mapped_column(UUID(as_uuid=True), ForeignKey("rooms.id"))

UserModel.room = relationship("RoomModel", back_populates='users')
