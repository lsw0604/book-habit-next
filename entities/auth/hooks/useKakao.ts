'use client';

import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { queryKeys } from '@/shared/query/keys';

import { authService } from '../api';
import { type Auth, toAuthViewModel } from '../model';

export const useKakao = (code: string) =>
  useQuery<Auth, AxiosError<ErrorDTO>>({
    queryKey: queryKeys.auth.kakao(code).queryKey,
    queryFn: async () => {
      const response = await authService.kakao(code);
      return toAuthViewModel(response);
    },
    enabled: !!code,
    retry: false,
    // 한 번 성공한 데이터는 다시 호출할 필요가 없음
    staleTime: Infinity,
    // 이 쿼리를 사용하는 컴포넌트가 언마운트되면 캐시를 바로 제거
    gcTime: 0,
  });
