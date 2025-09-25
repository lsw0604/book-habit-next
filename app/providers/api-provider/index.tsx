'use client';

import { useEffect, type ReactNode } from 'react';

import { authEvents, authService } from '@/entities/auth';
import type { UserDTO } from '@/entities/user';
import { apiAxiosInstance } from '@/shared/api/clients';
import { setupApiResponseInterceptor } from '@/shared/api/interceptors';

export function ApiProvider({ children }: { children: ReactNode }) {
  const { refresh } = authService;

  useEffect(() => {
    setupApiResponseInterceptor<UserDTO>(apiAxiosInstance, {
      refreshFn: () => refresh(),
      emitExpiredFn: reason => authEvents.emitExpired(reason),
      logoutFn: () => authEvents.emitLogout(),
    });
  }, [refresh]);

  return children;
}
