import { atom } from 'recoil';

const LOCAL_STORAGE_NAME = 'userInfo';

const getUserInfo = () => {
  if (typeof window === 'undefined') {
    return {} as UserType;
  }

  const user = window.localStorage.getItem(LOCAL_STORAGE_NAME);
  return user ? JSON.parse(user) as UserType : {} as UserType;
}

const saveItemToLocalStorage = (value: UserType) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(value));
}

export const userState = atom({
  key: 'userState',
  default: getUserInfo(),
  effects: [
    ({ onSet }) => {
      onSet((newValue) => {
        saveItemToLocalStorage(newValue);
      })
    }
  ]
})
