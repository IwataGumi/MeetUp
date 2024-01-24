import socketio


sio = socketio.AsyncServer(cors_allowed_origins="*", async_mode="asgi")

def sio_dep() -> socketio.AsyncServer:
    return sio
