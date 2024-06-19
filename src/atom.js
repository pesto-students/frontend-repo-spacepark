// src/atoms.js
import { atom } from 'jotai';
import store from 'store';
export const servicePricesAtom = atom({});
export const selectedServicesAtom = atom([]);

export const menuIndexState = atom(0);
export const roleAtom = atom(store.get('role') || '');
export const serviceAtom = atom([])
export const successResponseAtom = atom(false);
export const activeSpace = atom(null);
export const activeParkingSpace = atom({});
export const time = atom(1);
export const tokenAtom = atom(null);
export const userAtom = atom(localStorage.getItem('user') || null);

