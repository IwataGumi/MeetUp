import { atom } from 'recoil';

export const originalStreamState = atom<MediaStream | undefined>({
  key: 'originalStreamState',
  default: undefined,
})

export const localStreamState = atom<MediaStream | undefined>({
  key: 'localStreamState',
  default: undefined,
})

export const screenStreamState = atom<MediaStream | undefined>({
  key: 'screenStreamState',
  default: undefined,
})

