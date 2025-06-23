import type { AxiosError } from 'axios';
import type { User } from '@/entities/user/model';
import type { ErrorResponseDTO } from '@/shared/api/types/error';
import { useQuery } from '@tanstack/react-query';
import { toUserViewModel } from '@/entities/user/lib';
import { authService } from '../api';
import { queryKeys } from '@/shared/query/keys';

export const useKakao = (code: string) => {
  return useQuery<User, AxiosError<ErrorResponseDTO>>({
    queryKey: queryKeys.auth.kakao(code).queryKey,
    queryFn: async () => {
      const response = await authService.kakao(code);
      return toUserViewModel(response);
    },
    enabled: !!code,
    retry: false,
  });
};
