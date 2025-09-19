'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { serializeUser } from '@/entities/user/model';
import { useAppDispatch } from '@/shared/redux/store';
import { isClient } from '@/shared/utils/is-client';

import {
  DEFAULT_AUTHENTICATED_ROUTE,
  DEFAULT_UNAUTHENTICATED_ROUTE,
  AUTH_ROUTES,
} from '../constant';
import { AuthEventData } from '../model';
import { clearAuthState, setAuthState } from '../store';

/**
 * TODO 토스트 알림 추가
 */
export const useAuthProvider = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(
    (data: AuthEventData) => {
      if (isClient) {
        if (data.user) {
          // 사용자 상태 업데이트
          dispatch(
            setAuthState({
              user: { ...serializeUser(data.user) },
              isAuthenticated: true,
            })
          );
          // 현재 인증 관련 페이지에 있으면 리디렉션
          if (AUTH_ROUTES.some(route => pathname.includes(route))) {
            // URL 파라미터에서 리디렉션 경로 추천 (있는 경우)
            const urlParams = new URLSearchParams(window.location.search);
            const redirectTo =
              urlParams.get('redirectTo') || DEFAULT_AUTHENTICATED_ROUTE;
            router.push(redirectTo);
          }
        }
      }
    },
    [router, pathname, dispatch]
  );

  const handleRegister = useCallback(
    (data: AuthEventData) => {
      if (isClient) {
        if (data.user) {
          // 사용자 상태 업데이트
          dispatch(
            setAuthState({
              user: { ...serializeUser(data.user) },
              isAuthenticated: true,
            })
          );
          if (AUTH_ROUTES.some(route => pathname.includes(route))) {
            const urlParams = new URLSearchParams(window.location.search);
            const redirectTo =
              urlParams.get('redirectTo') || DEFAULT_AUTHENTICATED_ROUTE;
            router.push(redirectTo);
          }
        }
      }
    },
    [router, pathname, dispatch]
  );

  const handleLogout = useCallback(() => {
    // 상태 초기화
    dispatch(clearAuthState());
    router.push(DEFAULT_UNAUTHENTICATED_ROUTE);
  }, [router, dispatch]);

  const handleExpired = useCallback(() => {
    dispatch(clearAuthState());

    const isAuthRoute = AUTH_ROUTES.some(route => pathname.includes(route));
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
