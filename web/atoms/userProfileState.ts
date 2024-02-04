import { UserProfileType } from '@/@types/state';
import { atom } from 'recoil';

const LOCAL_STORAGE_NAME = 'userProfile';

const getUserInfo = () => {
  if (typeof window === 'undefined') {
    return {} as UserProfileType;
  }

  const user = window.localStorage.getItem(LOCAL_STORAGE_NAME);
  return user ? JSON.parse(user) as UserProfileType : {} as UserProfileType;
}

const saveItemToLocalStorage = (value: UserProfileType) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(value));
}

export const userProfileState = atom({
  key: 'userProfileState',
  default: getUserInfo(),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        saveItemToLocalStorage(newValue);
      })
    }
  ]
})