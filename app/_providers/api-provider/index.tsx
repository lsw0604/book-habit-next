'use client';

import { useEffect, useMemo, useState, type ReactNode } from 'react';

import { userService, userEvents } from '@/entities/user';
import {
  setupApiResponseInterceptor,
  apiAxiosInstance,
  ApiStatusProvider,
} from '@/shared/api';

export function ApiProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  const { refresh } = userService;

  useEffect(() => {
    let apiResponseInterceptor: number | undefined;

    try {
      apiResponseInterceptor = setupApiResponseInterceptor(apiAxiosInstance, {
        refreshFn: () => refresh(),
        onRefreshFailed: reason => userEvents.emitExpired(reason),
      });
    } finally {
      setIsInitialized(true);
    }
    return () => {
      if (apiResponseInterceptor !== undefined) {
        apiAxiosInstance.interceptors.response.eject(apiResponseInterceptor);
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
