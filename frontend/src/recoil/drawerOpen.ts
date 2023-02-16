import { atom } from 'recoil';

export const drawerState = atom({
  key: 'drawerState', // unique ID
  default: false,
});
