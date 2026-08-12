'use client';

import { useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import {
  AUTH_ROUTES,
  DEFAULT_AUTHENTICATED_ROUTE,
  DEFAULT_UNAUTHENTICATED_ROUTE,
} from '@/app/_config';
import { type UserEventData, userQueryKeys } from '@/entities/user';

/**
 * TODO 토스트 알림 추가
 */
export const useAuthProvider = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();

  const handleAuthSuccess = useCallback(
    (data: UserEventData) => {
      if (data.user) {
        // 로그인 응답을 캐시에 직접 재구성하지 않고, session 쿼리를 다시 검증해
        // 원본(서버) 데이터로만 캐시를 채운다.
        queryClient.invalidateQueries({
          queryKey: userQueryKeys.access.queryKey,
        });
      }

      if (AUTH_ROUTES.some(route => pathname.startsWith(route))) {
        const urlParams = new URLSearchParams(searchParams);
        const redirectTo =
          urlParams.get('redirectTo') || DEFAULT_AUTHENTICATED_ROUTE;
        router.push(redirectTo);
      }
    },
    [router, pathname, queryClient, searchParams]
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
    // 다른 사용자로 이어 로그인할 수 있으므로 서버 상태 캐시 전체를 비운다.
    queryClient.clear();
    router.push(DEFAULT_UNAUTHENTICATED_ROUTE);
  }, [router, queryClient]);

  const handleExpired = useCallback(() => {
    queryClient.clear();
    const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));
    const redirectUrl = isAuthRoute
      ? DEFAULT_UNAUTHENTICATED_ROUTE
      : `${DEFAULT_UNAUTHENTICATED_ROUTE}?redirectTo=${pathname}`;
    router.push(redirectUrl);
  }, [queryClient, router, pathname]);

  const handleError = useCallback(() => {
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
