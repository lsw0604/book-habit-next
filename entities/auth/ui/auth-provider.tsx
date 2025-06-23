'use client';

import React, { useEffect } from 'react';
import { authEvents } from '../model';
import { useAuthProvider } from '../hooks/useAuthProvider';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return <>{children}</>;
}
