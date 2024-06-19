// src/context/userContext.js
import React, { createContext, useContext, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom, tokenAtom } from '../atom';
import isAuthenticated from '../helpers/IsAuthenticated';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);
  const [, setToken] = useAtom(tokenAtom);

  useEffect(() => {
    if (isAuthenticated()) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, [setUser]);

  const value = { user, setToken, setUser, isAuthenticated: () => user !== null };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
