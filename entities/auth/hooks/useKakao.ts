import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { toUserViewModel } from '@/entities/user/lib';
import type { User } from '@/entities/user/model';
import type { ErrorResponseDTO } from '@/shared/api/types/error';
import { queryKeys } from '@/shared/query/keys';

import { authService } from '../api';

export const useKakao = (code: string) =>
  useQuery<User, AxiosError<ErrorResponseDTO>>({
    queryKey: queryKeys.auth.kakao(code).queryKey,
    queryFn: async () => {
      const response = await authService.kakao(code);
      return toUserViewModel(response);
    },
    enabled: !!code,
    retry: false,
  });
