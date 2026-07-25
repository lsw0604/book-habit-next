'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import {
  AUTH_ROUTES,
  DEFAULT_AUTHENTICATED_ROUTE,
  DEFAULT_UNAUTHENTICATED_ROUTE,
} from '@/app/_config';
import {
  type UserEventData,
  clearUserState,
  setUserState,
  serializeUser,
} from '@/entities/user';
import { useAppDispatch } from '@/shared/redux';
import { isClient } from '@/shared/utils';

/**
 * TODO 토스트 알림 추가
 */
export const useAuthProvider = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const handleAuthSuccess = useCallback(
    (data: UserEventData) => {
      if (isClient && data.user) {
        const serialized = serializeUser(data.user);
        dispatch(setUserState(serialized));
      }

      if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
        const urlParams = new URLSearchParams(searchParams);
        const redirectTo =
          urlParams.get('redirectTo') || DEFAULT_AUTHENTICATED_ROUTE;
        router.push(redirectTo);
      }
    },
    [router, pathname, dispatch]
  );

  const handleLogin = useCallback(
    (data: UserEventData) => handleAuthSuccess(data),
    [handleAuthSuccess]
  );

  const handleRegister = useCallback(
    (data: UserEventData) => handleAuthSuccess(data),
    [handleAuthSuccess]
  );

  const handleLogout = useCallback(() => {
    // 상태 초기화
    dispatch(clearUserState());
    router.push(DEFAULT_UNAUTHENTICATED_ROUTE);
  }, [router, dispatch]);

  const handleExpired = useCallback(() => {
    dispatch(clearUserState());
    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
    const redirectUrl = isAuthRoute
      ? DEFAULT_UNAUTHENTICATED_ROUTE
      : `${DEFAULT_UNAUTHENTICATED_ROUTE}?redirectTo=${pathname}`;
    router.push(redirectUrl);
  }, [dispatch, router, pathname]);

  const handleError = useCallback((data: UserEventData) => {
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
