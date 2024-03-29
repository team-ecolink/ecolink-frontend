import { atom } from 'recoil';

export const popUpModalState = atom<boolean>({
  key: 'popUpModalState',
  default: false,
});

export const ReviewModalState = atom<boolean>({
  key: 'ReviewModalState',
  default: false,
});

export const BookMarkModalState = atom<boolean>({
  key: 'BookMarkModalState',
  default: false,
});
