import { UUID } from "crypto";

export type muteControlsType = {
  camera: boolean;
  microphone: boolean;
}

export type DefaultDevicesType = {
  microphone?: MediaDeviceInfo;
  speaker?: MediaDeviceInfo;
  camera?: MediaDeviceInfo;
}

export type UserProfileType = {
  username?: string;
}

export type UserType = {
  userId: string;
  username: string;
  type: "offer" | "answer"
}