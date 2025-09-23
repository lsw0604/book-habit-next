'use client';

import { useEffect, ReactNode } from 'react';

import { authEvents } from '@/entities/auth';

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
