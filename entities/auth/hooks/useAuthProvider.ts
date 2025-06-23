import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { AuthEventData } from '../model';
import {
  DEFAULT_AUTHENTICATED_ROUTE,
  DEFAULT_UNAUTHENTICATED_ROUTE,
  AUTH_ROUTES,
} from '../constant';
import { isClient } from '@/shared/utils/is-client';
import { useAppDispatch } from '@/shared/redux/store';
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
            setAuthState({ user: { ...data.user }, isAuthenticated: true })
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
    [router, pathname]
  );

  const handleRegister = useCallback(
    (data: AuthEventData) => {
      if (isClient) {
        if (data.user) {
          // 사용자 상태 업데이트
          dispatch(
            setAuthState({ user: { ...data.user }, isAuthenticated: true })
          );
          if (AUTH_ROUTES.some(route => pathname.includes(route))) {
            router.push(DEFAULT_AUTHENTICATED_ROUTE);
          }
        }
      }
    },
    [router, pathname]
  );

  const handleLogout = useCallback(() => {
    // 상태 초기화
    dispatch(clearAuthState());
    router.push(DEFAULT_UNAUTHENTICATED_ROUTE);
  }, [router]);

  const handleExpired = useCallback(() => {
    dispatch(clearAuthState());
    router.push(DEFAULT_UNAUTHENTICATED_ROUTE);
  }, [router]);

  const handleError = useCallback((data: AuthEventData) => {}, []);

  return {
    handleError,
    handleLogin,
    handleLogout,
    handleExpired,
    handleRegister,
  };
};
