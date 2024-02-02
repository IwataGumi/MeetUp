import VideoControlls from "@/components/Camera/Controlls/VideoControlls";
import VideoContainer from "@/components/Camera/VideoContainer";
import { WebSocketURL } from "@/utils/static";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const Room = () => {
  const router = useRouter();
  const [webSocktURL, setWebSocketURL] = useState(`${WebSocketURL}/ws/rooms/test`);

  const { sendMessage } = useWebSocket(webSocktURL);

  useEffect(() => {
    if (router.query.id === undefined) return
    setWebSocketURL(`${WebSocketURL}/ws/rooms/${router.query.id}`)
    console.log(document.cookie)
  }, [router.query])

  const handleClickSendMessage = useCallback(() => sendMessage('Hello'), [sendMessage]);

  return (
    <>
      <div className="m-2 mt-16 flex flex-col">
        {/*         
        <VideoContainer />
        <VideoControlls />
         */}
         <button className="btn btn-primary" onClick={handleClickSendMessage}>
          Test
         </button>
      </div>
    </>
  );
};

export default Room;