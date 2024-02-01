import { socketState } from "@/atoms/socket";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { io } from "socket.io-client";


const Socket = () => {
  const setSocket  = useSetRecoilState(socketState);

  useEffect(() => {
    const sock = io(`${process.env.NEXT_PUBLIC_API_URL}/socket.io`, { transports: ["websocket", "polling", "flashsocket"] });
    sock.on("connect", () => {
      setSocket(sock);
    });
  }, [setSocket]);
  return <></>;
};

export default Socket;