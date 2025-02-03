'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Benutzerkontext erstellen
const UserContext = createContext();

// Benutzerkontext-Provider
export const UserProviderr = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  // Lade Benutzerinformationen aus localStorage beim Initialisieren
  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, []);

  // Speichere Benutzerinformationen in localStorage, wenn sie sich ändern
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook für einfachen Zugriff auf den Kontext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
