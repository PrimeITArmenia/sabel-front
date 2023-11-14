import { atom } from 'recoil';

export const sidebarShowState = atom({
    key: 'sidebarShowState',
    default: true,
});

export const sidebarUnfoldableState = atom({
    key: 'sidebarUnfoldableState',
    default: false,
});
