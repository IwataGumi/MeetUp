from fastapi.routing import APIRouter

from api.web.webrtc import offer

webrtc_router = APIRouter()
webrtc_router.include_router(offer.router)
