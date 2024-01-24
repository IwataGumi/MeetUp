import uuid

from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID

from api.db.base import Base

class UserModel(Base):

    __tablename__ = 'users'

    id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), unique=True, primary_key=True, default=uuid.uuid4)
    room_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("users.id"))
