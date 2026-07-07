'use client';

import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { ErrorDTO } from '@/shared/api/dto';
import { queryKeys } from '@/shared/query/keys';

import { type LoginDTO, loginService } from '../api';
import { toUserViewModel, type User } from '@/entities/user';

export const useKakao = (code: string) =>
  useQuery<User, AxiosError<ErrorDTO>, LoginDTO>({
    queryKey: queryKeys.auth.kakao(code).queryKey,
    queryFn: async () => {
      const response = await loginService.kakao(code);
      const { user } = response;
      return toUserViewModel(user);
    },
    enabled: !!code,
    retry: false,
    // 한 번 성공한 데이터는 다시 호출할 필요가 없음
    staleTime: Infinity,
    // 이 쿼리를 사용하는 컴포넌트가 언마운트되면 캐시를 바로 제거
    gcTime: 0,
  });
