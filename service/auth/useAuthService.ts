import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { queryKeys } from '@/queries/query-key';
import { getAuthService } from '.';

export function useKakao(code: string) {
  const AuthService = getAuthService();

  return useQuery<ResponseAuth, AxiosError<NestServerErrorType>>({
    queryKey: queryKeys.auth.kakao(code).queryKey,
    queryFn: () => AuthService.kakao(code),
    enabled: !!code,
    retry: false,
  });
}

export function useAuthMutation() {
  const AuthService = getAuthService();

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

  const logout = useMutation

  return {
    login,
    register,
  };
}
