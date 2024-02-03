from fastapi.routing import APIRouter

from api.web.api import docs, monitoring, rooms, token, users

api_router = APIRouter()
api_router.include_router(monitoring.router)
api_router.include_router(docs.router)
api_router.include_router(users.router, prefix="/users", tags=["auth"])
api_router.include_router(rooms.router, prefix="/rooms", tags=["room"])
api_router.include_router(token.router, tags=["auth", "token"])
