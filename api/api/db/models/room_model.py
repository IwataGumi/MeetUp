import uuid
from typing import List
from api.db.models.associations.room_user import RoomLinkUser
from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID

from api.db.base import Base

if TYPE_CHECKING:
    from api.db.models.user_model import UserModel

class RoomModel(Base):

    __tablename__ = "rooms"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), unique=True, primary_key=True, default=uuid.uuid4
    )
    owner_id: Mapped[UUID] = mapped_column(UUID(as_uuid=True), ForeignKey('users.id'))

    users: Mapped[List["UserModel"]] =  relationship(
        secondary="room_link_user",
        back_populates="rooms",
    )
    user_associations: Mapped[List[RoomLinkUser]] = relationship(
        back_populates='room',
    )
