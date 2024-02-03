import uuid
from datetime import datetime
from typing import Any, Literal, Union

from pydantic import BaseModel


ReceiveMessageType = Literal[
    "chat",
    "join_room",
    "leave_room",
]


class ReceiveChatBody(BaseModel):
    text: str
    created_at: datetime


class ReceiveJoinRoomBody(BaseModel):
    username: str


class ReceiveChangeNameBody(BaseModel):
    username: str


class ReceiveLeaveRoomBody(BaseModel):
    pass


class ReceiveContent(BaseModel):
    type: ReceiveMessageType
    body: Any
