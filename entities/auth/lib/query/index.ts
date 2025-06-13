import { useMutation, useQuery } from '@tanstack/react-query';
import { authService } from '../../api';
import { LoginPayload, RegisterPayload, ResponseAuth } from '../../api/types';
import { AxiosError } from 'axios';
import { ErrorResponseDto } from '@/shared/api/types/error';
import { queryKeys } from '@/shared/query/keys';

export const useKakao = (code: string) => {
  return useQuery<ResponseAuth, AxiosError<ErrorResponseDto>>({
    queryKey: queryKeys.auth.kakao(code).queryKey,
    queryFn: async (): Promise<ResponseAuth> => {
      const response: ResponseAuth = await authService.kakao(code);
      return response;
    },
    enabled: !!code,
    retry: false,
  });
};

export const useAuthMutations = () => {
  const login = useMutation<
    ResponseAuth,
    AxiosError<ErrorResponseDto>,
    LoginPayload
  >({
    mutationFn: async (payload: LoginPayload): Promise<ResponseAuth> => {
      const response: ResponseAuth = await authService.login(payload);
      return response;
    },
  });

  const register = useMutation<
    ResponseAuth,
    AxiosError<ErrorResponseDto>,
    RegisterPayload
  >({
    mutationFn: async (payload: RegisterPayload): Promise<ResponseAuth> => {
      const response: ResponseAuth = await authService.register(payload);
      return response;
    },
  });

  return {
    login,
    register,
  };
};
