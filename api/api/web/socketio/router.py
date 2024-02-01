import socketio

class NoPrefixNamespace(socketio.AsyncNamespace):
    def on_connect(self, sid, environ):
        print(sid)
        print('接続しました')

    def on_disconnect(self, sid):
        print('切断されました')

    def on_client_to_server(self, sid, msg):
        print(msg + '受信しました')
        self.emit('response', msg)
