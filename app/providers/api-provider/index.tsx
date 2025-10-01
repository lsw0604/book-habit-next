'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';

import { AuthDTO, authEvents, authService } from '@/entities/auth';
import { apiAxiosInstance, authAxiosInstance } from '@/shared/api/clients';
import { ApiStatusProvider } from '@/shared/api/hooks';
import {
  setupApiResponseInterceptor,
  setupAuthResponseInterceptor,
  setupRequestInterceptor,
} from '@/shared/api/interceptors';

function extractToken(response: AuthDTO) {
  const { accessToken } = response;

  return accessToken;
}

export function ApiProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const { refresh } = authService;

  useEffect(() => {
    let apiRequestInterceptor: number | undefined;
    let authRequestInterceptor: number | undefined;
    let apiResponseInterceptor: number | undefined;
    let authResponseInterceptor: number | undefined;

    try {
      apiRequestInterceptor = setupRequestInterceptor(apiAxiosInstance);
      authRequestInterceptor = setupRequestInterceptor(authAxiosInstance);
      apiResponseInterceptor = setupApiResponseInterceptor<AuthDTO>(
        apiAxiosInstance,
        {
          refreshFn: () => refresh(),
          onRefreshFailed: reason => authEvents.emitExpired(reason),
          extractToken: response => extractToken(response),
        }
      );
      authResponseInterceptor = setupAuthResponseInterceptor(authAxiosInstance);
    } finally {
      setIsInitialized(true);
    }
    return () => {
      apiAxiosInstance.interceptors.request.eject(apiRequestInterceptor);
      authAxiosInstance.interceptors.request.eject(authRequestInterceptor);
      apiAxiosInstance.interceptors.response.eject(apiResponseInterceptor);
      authAxiosInstance.interceptors.response.eject(authResponseInterceptor);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const contextValue = useMemo(
    () => ({
      isInitialized,
    }),
    [isInitialized]
  );

  return <ApiStatusProvider value={contextValue}>{children}</ApiStatusProvider>;
}
