'use client';

import { useEffect, ReactNode } from 'react';

import { useAuthProvider } from '../hooks';
import { authEvents } from '../model';

export function AuthProvider({ children }: { children: ReactNode }) {
  const {
    handleError,
    handleExpired,
    handleLogin,
    handleLogout,
    handleRegister,
  } = useAuthProvider();

  useEffect(() => {
    const unsubscribes = [
      authEvents.onLogin(handleLogin),
      authEvents.onLogout(handleLogout),
      authEvents.onExpired(handleExpired),
      authEvents.onError(handleError),
      authEvents.onRegister(handleRegister),
    ];

    return () => unsubscribes.forEach(unsubscribe => unsubscribe());
  }, [handleError, handleExpired, handleLogin, handleLogout, handleRegister]);

  return children;
}
