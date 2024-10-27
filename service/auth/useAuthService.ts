import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import AuthService from './AuthService';
import { queryKeys } from '@/queries/query-key';

export function useKakao(code: string) {
  return useQuery<ResponseAuth, AxiosError<NestServerErrorType>>({
    queryKey: queryKeys.auth.kakao(code).queryKey,
    queryFn: () => AuthService.kakao(code),
    enabled: !!code,
    retry: false,
  });
}

export function useAuthMutation() {
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
