import uuid
from api.db.models.user_model import UserModel
from fastapi import WebSocket


class User:
    def __init__(
        self,
        id: uuid.UUID,
        username: str,
        websocket: WebSocket,
        user_model: UserModel,
    ):
        self.id = id
        self.username = username
        self.websocket = websocket
        self.user_model = user_model
