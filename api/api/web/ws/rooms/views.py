from typing import Annotated, List
import uuid
from api.db.dao.room_dao import RoomDAO
from loguru import logger
from fastapi import APIRouter, Depends, Path, WebSocket, WebSocketDisconnect

logger = logger.bind(task="ws_Rooms")

router = APIRouter()

@router.websocket(path="/{room_uuid}")
async def rooms_ws(
    websocket: WebSocket,
    room_uuid: Annotated[str, Path(title="The uuid of room.")],
):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            print(data)
    except WebSocketDisconnect:
        print('接続が切断されました。')
