import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { useAuthService } from '@/service/auth/AuthService';
import useServiceInstance from '@/hooks/useServiceInstance';
import { queryKeys } from '@/queries/query-key';

export function useKakao(code: string) {
  const AuthService = useServiceInstance(useAuthService);

  return useQuery<ResponseAuth, AxiosError<NestServerErrorType>>({
    queryKey: queryKeys.auth.kakao(code).queryKey,
    queryFn: () => AuthService.kakao(code),
    enabled: !!code,
    retry: false,
  });
}

export function useAuthMutation() {
  const AuthService = useServiceInstance(useAuthService);

  const login = useMutation<
    ResponseAuth,
    AxiosError<NestServerErrorType>,
    RequestLogin
  >({
    mutationFn: (payload) => AuthService.login(payload),
  });

  const register = useMutation<
    ResponseAuth,
    AxiosError<NestServerErrorType>,
    RequestRegister
  >({
    mutationFn: (payload) => AuthService.register(payload),
  });
  return {
    login,
    register,
  };
}
