import uuid
from typing import List
from datetime import datetime
from api.schemas.user import UserInfo
from pydantic import BaseModel, ConfigDict

class RoomInfo(BaseModel):
    """DTO for Room model."""

    id: uuid.UUID
    owner_id: uuid.UUID
    users: List[UserInfo] = []
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)