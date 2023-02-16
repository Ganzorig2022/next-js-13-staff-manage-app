import { atom } from 'recoil';

export const adminState = atom({
  key: 'isAdminState', // unique ID
  default: false,
});
