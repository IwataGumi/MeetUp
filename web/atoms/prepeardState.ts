import { atom } from "recoil";

export const preparedState = atom<boolean>({
  key: 'preparedState',
  default: false,
})
