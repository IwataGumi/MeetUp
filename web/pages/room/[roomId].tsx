import VideoControlls from "@/components/Camera/Controlls/VideoControlls";
import VideoContainer from "@/components/Camera/VideoContainer";
import { WebSocketURL } from "@/utils/static";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef,  } from "react";
import ReconnectingWebSocket from 'reconnecting-websocket';

const Room = () => {
  const router = useRouter();
  const [message, setMessage] = React.useState<string>()
  const websocketRef = useRef<ReconnectingWebSocket>();

  const connectWebscoket = useCallback(async (roomId: string | string[] | undefined) => {
    if (websocketRef === undefined) return;

    const websocket = new ReconnectingWebSocket(
      `${WebSocketURL}/ws/rooms/${roomId}`
    );
    websocketRef.current = websocket;

    const onMessage = (event: MessageEvent<string>) => {
      setMessage(event.data)
      console.log(event.data)
    }
    websocket.addEventListener('message', onMessage)

    // #3.useEffectのクリーンアップの中で、WebSocketのクローズ処理を実行
    return () => {
      websocket.close()
      websocket.removeEventListener('message', onMessage)
    }

  }, [])

  useEffect(() => {
    const { roomId } = router.query;
    if (roomId !== undefined) {
      connectWebscoket(roomId);
    }
  }, [connectWebscoket, router.isReady, router.query, router.query.id])

  return (
    <>
      <div className="m-2 mt-16 flex flex-col">
        {/* <VideoContainer />
        <VideoControlls /> */}
         <button className="btn btn-primary" onClick={() => websocketRef.current?.send_json('送信メッセージ')}>
          Test
         </button>
      </div>
    </>
  );
};

export default Room;