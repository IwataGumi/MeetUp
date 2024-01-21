import { atom } from "recoil";

const LOCAL_STORAGE_NAME = 'videoControls';

type VideoControlsType = {
  camera: boolean;
  microphone: boolean;
}

const defaultVideoControls: VideoControlsType = {
  camera: true,
  microphone: true,
}

const getVideoControls = () => {
  if (typeof window === 'undefined') {
    return defaultVideoControls;
  }

  const controls = window.localStorage.getItem(LOCAL_STORAGE_NAME);
  return controls ? JSON.parse(controls) as VideoControlsType : defaultVideoControls;
}

const saveItemToLocalStorage = (value: VideoControlsType) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(value));
}

export const videoControlsState = atom<VideoControlsType>({
  key: 'videoControlState',
  default: getVideoControls(),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        saveItemToLocalStorage(newValue);
      })
    }
  ],
})
