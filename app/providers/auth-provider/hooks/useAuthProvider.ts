'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

import {
  AUTH_ROUTES,
  DEFAULT_AUTHENTICATED_ROUTE,
  DEFAULT_UNAUTHENTICATED_ROUTE,
} from '@/app/config/routes';
import {
  type AuthEventData,
  clearAuthState,
  setAuthState,
  serializeAuth,
} from '@/entities/auth';
import { useAppDispatch } from '@/shared/redux/store';
import { isClient } from '@/shared/utils';

/**
 * TODO 토스트 알림 추가
 */
export const useAuthProvider = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleAuthSuccess = useCallback(
    (data: AuthEventData) => {
      if (isClient && data.auth) {
        dispatch(setAuthState(serializeAuth(data.auth)));
      }

      if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectTo =
          urlParams.get('redirectTo') || DEFAULT_AUTHENTICATED_ROUTE;
        router.push(redirectTo);
      }
    },
    [router, pathname, dispatch]
  );

  const handleLogin = useCallback(
    (data: AuthEventData) => handleAuthSuccess(data),
    [handleAuthSuccess]
  );

  const handleRegister = useCallback(
    (data: AuthEventData) => handleAuthSuccess(data),
    [handleAuthSuccess]
  );

  const handleLogout = useCallback(() => {
    // 상태 초기화
    dispatch(clearAuthState());
    router.push(DEFAULT_UNAUTHENTICATED_ROUTE);
  }, [router, dispatch]);

  const handleExpired = useCallback(() => {
    dispatch(clearAuthState());
    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
    const redirectUrl = isAuthRoute
      ? DEFAULT_UNAUTHENTICATED_ROUTE
      : `${DEFAULT_UNAUTHENTICATED_ROUTE}?redirectTo=${pathname}`;
    router.push(redirectUrl);
  }, [dispatch, router, pathname]);

  const handleError = useCallback((data: AuthEventData) => {
    /**
     * TODO 토스트 알람 추가하기
     */
  }, []);

  return {
    handleError,
    handleLogin,
    handleLogout,
    handleExpired,
    handleRegister,
  };
};
