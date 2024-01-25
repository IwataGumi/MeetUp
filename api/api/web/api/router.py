from fastapi.routing import APIRouter

from api.web.api import docs, monitoring, rooms

api_router = APIRouter()
api_router.include_router(monitoring.router)
api_router.include_router(docs.router)
api_router.include_router(rooms.router, prefix="/rooms")
