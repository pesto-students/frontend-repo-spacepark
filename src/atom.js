// src/atoms.js
import { atom } from 'jotai';

export const servicePricesAtom = atom({});
export const selectedServicesAtom = atom([]);

export const menuIndexState = atom(0);

export const serviceAtom = atom([])
export const successResponseAtom = atom(false);
export const activeSpace = atom(null);
export const activeParkingSpace = atom({});
export const time = atom(1);
