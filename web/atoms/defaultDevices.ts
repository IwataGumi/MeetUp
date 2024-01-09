import { atom } from 'recoil';

const LOCAL_STORAGE_NAME = 'defaultDevices'

type DefaultDevicesType = {
  microphone?: MediaDeviceInfo;
  speaker?: MediaDeviceInfo;
  camera?: MediaDeviceInfo;
}

const filterDevicesByType = (devices: MediaDeviceInfo[], type: MediaDeviceKind) => {
  return devices.filter((device) => device.kind === type);
}

const getDefaultDevices = async () => {
  if (typeof navigator === 'undefined') {
    return {} as DefaultDevicesType;
  }
  const devices = await navigator.mediaDevices.enumerateDevices();
  const defaultMicrophone = filterDevicesByType(devices, 'audioinput')[0];
  const defaultSpeaker = filterDevicesByType(devices, 'audiooutput')[0];
  const defaultCamera = filterDevicesByType(devices, 'videoinput')[0];

  const newDefaultDevices: DefaultDevicesType = {
    microphone: defaultMicrophone,
    speaker: defaultSpeaker,
    camera: defaultCamera,
  }

  saveItemToLocalStorage(newDefaultDevices);

  return newDefaultDevices
}

const getLocalStorageItem = async () => {
  const defaultDevices = getDefaultDevices()
  if (typeof window === 'undefined') {
    return defaultDevices
  }
  const devices = window.localStorage.getItem(LOCAL_STORAGE_NAME);
  return devices ? JSON.parse(devices) as DefaultDevicesType : defaultDevices
}

const saveItemToLocalStorage = (value: DefaultDevicesType) => { 
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(value));
};

export const defaultDevices = atom({
  key: 'devicesState',
  default: getLocalStorageItem(),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        saveItemToLocalStorage(newValue);
      });
    },
  ],
})


