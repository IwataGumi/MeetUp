import { UserType } from '@/@types/state';
import { atom } from 'recoil';

export const usersState = atom<UserType[]>({
  key: 'usersState',
  default: [],
})