'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';

import { type RefreshDTO, userService, userEvents } from '@/entities/user';
import {
  setupApiResponseInterceptor,
  setupAuthResponseInterceptor,
  setupRequestInterceptor,
  apiAxiosInstance, 
  authAxiosInstance,
  ApiStatusProvider
} from '@/shared/api';

function extractToken(response: RefreshDTO) {
  const { accessToken } = response;

  return accessToken;
}

export function ApiProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  const { refresh } = userService;

  useEffect(() => {
    let apiRequestInterceptor: number | undefined;
    let authRequestInterceptor: number | undefined;
    let apiResponseInterceptor: number | undefined;
    let authResponseInterceptor: number | undefined;

    try {
      apiRequestInterceptor = setupRequestInterceptor(apiAxiosInstance);
      authRequestInterceptor = setupRequestInterceptor(authAxiosInstance);
      apiResponseInterceptor = setupApiResponseInterceptor<RefreshDTO>(
        apiAxiosInstance,
        {
          refreshFn: () => refresh(),
          onRefreshFailed: reason => userEvents.emitExpired(reason),
          extractToken: response => extractToken(response),
        }
      );
      authResponseInterceptor = setupAuthResponseInterceptor<RefreshDTO>(
        authAxiosInstance,
        {
          extractToken: response => extractToken(response),
        }
      );
    } finally {
      setIsInitialized(true);
    }
    return () => {
      if (apiRequestInterceptor !== undefined) {
        apiAxiosInstance.interceptors.request.eject(apiRequestInterceptor);
      }
      if (authRequestInterceptor !== undefined) {
        authAxiosInstance.interceptors.request.eject(authRequestInterceptor);
      }
      if (apiResponseInterceptor !== undefined) {
        apiAxiosInstance.interceptors.response.eject(apiResponseInterceptor);
      }
      if (authResponseInterceptor !== undefined) {
        authAxiosInstance.interceptors.response.eject(authResponseInterceptor);
      }
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
