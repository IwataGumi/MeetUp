import socketio
from fastapi import FastAPI
from api.settings import settings
from api.web.socketio.router import NoPrefixNamespace

def get_sio_app(app: FastAPI) -> socketio.ASGIApp:
    mgr = socketio.AsyncAioPikaManager(str(settings.rabbit_url))

    sio = socketio.AsyncServer(
        cors_allowed_origins="*",
        async_mode="asgi",
        client_manager=mgr,
        logger=True,
        engineio_logger=True,
    )

    sio.register_namespace(NoPrefixNamespace('/socket.io'))
    sio_app = socketio.ASGIApp(sio, app)

    return sio_app
