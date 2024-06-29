// src/context/userContext.js
import React, { createContext, useContext, useEffect } from 'react';
import { useAtom } from 'jotai';
import { userAtom, tokenAtom, roleAtom } from '../atom';
import isAuthenticated from '../helpers/IsAuthenticated';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);
  const [role, setRole] = useAtom(roleAtom);
  const [, setToken] = useAtom(tokenAtom);

  useEffect(() => {
    if (isAuthenticated()) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const userRole = localStorage.getItem('role');
      if (storedUser) {
        setUser(storedUser);
        setRole(userRole);
      }
    }
  }, [setUser, setRole]);

  const value = { user,role,setRole, setToken, setUser, isAuthenticated: () => user !== null };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
