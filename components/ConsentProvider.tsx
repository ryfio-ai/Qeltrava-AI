"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type ConsentContextType = {
  hasConsent: boolean;
  acceptConsent: () => void;
  declineConsent: () => void;
  isInitialized: boolean;
};

const ConsentContext = createContext<ConsentContextType>({
  hasConsent: false,
  acceptConsent: () => {},
  declineConsent: () => {},
  isInitialized: false,
});

export const useConsent = () => useContext(ConsentContext);

export const ConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [hasConsent, setHasConsent] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('qeltrava_cookie_consent');
    if (consent === 'true') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasConsent(true);
    }
    setIsInitialized(true);
  }, []);

  const acceptConsent = () => {
    localStorage.setItem('qeltrava_cookie_consent', 'true');
    setHasConsent(true);
  };

  const declineConsent = () => {
    localStorage.setItem('qeltrava_cookie_consent', 'false');
    setHasConsent(false);
  };

  return (
    <ConsentContext.Provider value={{ hasConsent, acceptConsent, declineConsent, isInitialized }}>
      {children}
    </ConsentContext.Provider>
  );
};
