import { Socket } from "socket.io-client";

export type ServerToClientEvents = {
};

export type ClientToServerEvents = {
  client_to_server: (param: string) => void;
};

export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>
