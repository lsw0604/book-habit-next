import type {
  RequestKakao,
  RequestLogin,
  RequestRegister,
  ResponseAuth,
} from '@/service/api/auth/types';
import type { AxiosError } from 'axios';

import { useQuery, useMutation } from '@tanstack/react-query';
import { authService } from '@/service/api/auth';
import { queryKeys } from '@/queries';

export const useKakao = ({ code }: RequestKakao) => {
  const service = authService();

  return useQuery<ResponseAuth, AxiosError<NestServerErrorType>>({
    queryKey: queryKeys.auth.kakao(code).queryKey,
    queryFn: () => service.kakao({ code }),
    enabled: !!code,
    retry: false,
  });
};

export const useAuthMutation = () => {
  const service = authService();

  const login = useMutation<
    ResponseAuth,
    AxiosError<NestServerErrorType>,
    RequestLogin
  >({
    mutationFn: payload => service.login(payload),
  });

  const register = useMutation<
    ResponseAuth,
    AxiosError<NestServerErrorType>,
    RequestRegister
  >({
    mutationFn: payload => service.register(payload),
  });

  return {
    login,
    register,
  };
};
