import { atom } from "recoil";

const LOCAL_STORAGE_NAME = 'videoControls';

type muteControlsType = {
  camera: boolean;
  microphone: boolean;
}

const defaultMuteControls: muteControlsType = {
  camera: false,
  microphone: false,
}

const getVideoControls = () => {
  if (typeof window === 'undefined') {
    return defaultMuteControls;
  }

  const controls = window.localStorage.getItem(LOCAL_STORAGE_NAME);
  return controls ? JSON.parse(controls) as muteControlsType : defaultMuteControls;
}

const saveItemToLocalStorage = (value: muteControlsType) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(value));
}

export const muteControlsState = atom<muteControlsType>({
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
