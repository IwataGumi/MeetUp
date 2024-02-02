from typing import List
import uuid
from api.db.models.user_model import UserModel

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declared_attr

from api.db.base import Base


class RoomModel(Base):

    __tablename__ = "rooms"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), unique=True, primary_key=True, default=uuid.uuid4
    )
    
    @declared_attr
    def users(cls):
        return relationship(UserModel, back_populates='room')
