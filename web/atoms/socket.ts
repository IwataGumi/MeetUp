import { atom } from "recoil";
import { SocketType } from "@/@types/socket";

export const socketState = atom<SocketType | undefined>({
  key: 'socketState',
  default: undefined,
});
