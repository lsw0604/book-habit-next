'use client';

import { useEffect, type ReactNode } from 'react';

import { authEvents, authService } from '@/entities/auth';
import { apiAxiosInstance, authAxiosInstance } from '@/shared/api/clients';
import {
  setupApiResponseInterceptor,
  setupAuthResponseInterceptor,
  setupRequestInterceptor,
} from '@/shared/api/interceptors';

export function ApiProvider({ children }: { children: ReactNode }) {
  const { refresh } = authService;

  useEffect(() => {
    setupRequestInterceptor(apiAxiosInstance);
    setupRequestInterceptor(authAxiosInstance);
    setupApiResponseInterceptor(apiAxiosInstance, {
      refreshFn: () => refresh(),
      onRefreshFailed: reason => authEvents.emitExpired(reason),
    });
    setupAuthResponseInterceptor(authAxiosInstance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
