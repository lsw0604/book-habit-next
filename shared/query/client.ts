import { QueryClient } from '@tanstack/react-query';
import { cache } from 'react';

/** QueryClient 공통 기본 옵션 설정 */
export const queryClientConfig = {
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 1,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retryOnMount: false,
      retry: 0,
    },
    mutations: {
      retry: 0,
    },
  },
};

/** QueryClient 팩토리 함수 (클라이언트/서버 공용) */
export const createQueryClient = () => new QueryClient(queryClientConfig);

/** 서버 컴포넌트(RSC) 전용 요청 단위 캐시 getQueryClient */
export const getQueryClient = cache(() => createQueryClient());
