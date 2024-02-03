import uuid
from datetime import datetime
from typing import Any, Literal, Union

from pydantic import BaseModel

SendMessageType = Literal[
    "chat",
    "join_room",
    "leave_room",
]


class SendChatBody(BaseModel):
    user_id: str | uuid.UUID
    username: str
    text: str


class SendJoinRoomBody(BaseModel):
    user_id: str | uuid.UUID
    username: str


class SendChangeNameBody(BaseModel):
    user_id: str | uuid.UUID
    username: str


class SendLeaveRoomBody(BaseModel):
    user_id: str | uuid.UUID
    username: str


class SendContent(BaseModel):
    type: SendMessageType
    body: Any
