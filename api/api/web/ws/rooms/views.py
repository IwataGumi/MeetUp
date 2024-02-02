from typing import Annotated, Literal
import uuid
from api.db.dao.room_dao import RoomDAO
from api.db.models.user_model import UserModel
from api.dependencies.auth import with_authenticate
from loguru import logger
from fastapi import APIRouter, Depends, HTTPException, Path, status, WebSocket, WebSocketDisconnect
from pydantic import BaseModel, ValidationError

logger = logger.bind(task="ws_Rooms")

router = APIRouter()  # Correct router initialization


@router.websocket(path="/{room_uuid}")
async def rooms_ws(
    websocket: WebSocket,
):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            print(data)
            await websocket.send_text(f"Message text was: {data}")
    except WebSocketDisconnect:
        print("切断しました。")