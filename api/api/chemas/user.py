import uuid
from datetime import datetime
from pydantic import BaseModel

class UserInfo(BaseModel):
    """DTO for User model."""

    id: uuid.UUID
    room_id: uuid.UUID
    created_at: datetime
    updated_at: datetime
