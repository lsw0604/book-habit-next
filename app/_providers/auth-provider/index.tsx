'use client';

import { useEffect, ReactNode } from 'react';

import { userEvents } from '@/entities/user';

import { useAuthProvider } from './hooks';

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
      userEvents.onLogin(handleLogin),
      userEvents.onLogout(handleLogout),
      userEvents.onExpired(handleExpired),
      userEvents.onError(handleError),
      userEvents.onRegister(handleRegister),
    ];

    return () => unsubscribes.forEach(unsubscribe => unsubscribe());
  }, [handleError, handleExpired, handleLogin, handleLogout, handleRegister]);

  return children;
}
