import { userService, userEvents } from '@/entities/user';
import { setupApiResponseInterceptor, apiAxiosInstance } from '@/shared/api';

let isBound = false;

/**
 * 401 재발급 인터셉터를 apiAxiosInstance에 한 번만 바인딩한다.
 *
 * useEffect가 아니라 모듈 로드 시점에 붙이는 이유:
 * 이펙트는 첫 렌더 '이후'에 실행되므로, 그 사이에 나간 쿼리는 인터셉터 없이 요청된다.
 * 예전에는 그 창을 isInitialized 게이트로 막았지만(모든 쿼리를 첫 렌더에서 비활성화),
 * 게이트 비용이 커져서 순서를 뒤집었다 — 바인딩을 렌더보다 앞으로 당긴다.
 *
 * 가드 두 개:
 * - `typeof window` : 'use client' 모듈도 SSR 중 평가되므로, 서버에 인터셉터가 붙으면
 *   서버 prefetch의 401이 쿠키 없는 재발급 요청을 유발한다.
 * - `isBound` : 개발 모드 HMR에서 중복 바인딩을 막는다.
 *
 * eject하지 않는 이유: apiAxiosInstance가 모듈 싱글턴이라 수명이 앱과 같다.
 */
export const ensureApiInterceptor = () => {
  if (isBound || typeof window === 'undefined') return;

  isBound = true;

  setupApiResponseInterceptor(apiAxiosInstance, {
    refreshFn: () => userService.refresh(),
    onRefreshFailed: reason => userEvents.emitExpired(reason),
  });
};
