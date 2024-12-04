'use client';

import React, { createContext, useContext, useState } from 'react';

// Benutzerkontext erstellen
const UserContext = createContext();

// Benutzerkontext-Provider
export const UserProviderr = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null); // Benutzerinformationen (inkl. Rolle)

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