from api.web.ws import rooms
from fastapi.routing import APIRouter

ws_router = APIRouter()

ws_router.include_router(rooms.router, prefix="/rooms")