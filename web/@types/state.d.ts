type muteControlsType = {
  camera: boolean;
  microphone: boolean;
}

type DefaultDevicesType = {
  microphone?: MediaDeviceInfo;
  speaker?: MediaDeviceInfo;
  camera?: MediaDeviceInfo;
}

type UserType = {
  username?: string;
}
