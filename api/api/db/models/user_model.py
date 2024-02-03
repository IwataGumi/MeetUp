from typing import List
import uuid

from typing import TYPE_CHECKING

from sqlalchemy.orm import Mapped, mapped_column, relationship
from api.db.models.associations.room_user import RoomLinkUser
from sqlalchemy.dialects.postgresql import UUID

from api.db.base import Base

if TYPE_CHECKING:
    from api.db.models.room_model import RoomModel


class UserModel(Base):

    __tablename__ = "users"

    id: Mapped[UUID] = mapped_column(
        UUID(as_uuid=True), unique=True, primary_key=True, default=uuid.uuid4
    )

    rooms: Mapped[List["RoomModel"]] = relationship(
        secondary="room_link_user",
        back_populates="users",
    )
    room_associations: Mapped[List[RoomLinkUser]] = relationship(
        back_populates="user",
    )
