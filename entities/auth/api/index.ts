import type {
  AuthService,
  LoginPayload,
  RegisterPayload,
  ResponseAuth,
} from './types';
import { API_ENDPOINTS } from '@/shared/api/constant';
import { authAxiosInstance, authClient } from '@/shared/api/clients';
import { ResponseDto } from '@/shared/api/types/response';
import { AxiosResponse } from 'axios';

export const authService: AuthService = {
  login: async (payload: LoginPayload): Promise<ResponseAuth> => {
    return await authClient.post<ResponseAuth>(
      API_ENDPOINTS.AUTH.SIGNIN,
      payload
    );
  },
  register: async (payload: RegisterPayload): Promise<ResponseAuth> => {
    return await authClient.post<ResponseAuth>(
      API_ENDPOINTS.AUTH.SIGNUP,
      payload
    );
  },
  kakao: async (code: string): Promise<ResponseAuth> => {
    return await authClient.get<ResponseAuth>(
      `${API_ENDPOINTS.AUTH.KAKAO}?code=${code}`
    );
  },
  access: async (): Promise<ResponseAuth> => {
    return await authClient.get<ResponseAuth>(API_ENDPOINTS.AUTH.ACCESS);
  },
  refresh: async (): Promise<AxiosResponse<ResponseDto<ResponseAuth>>> => {
    return await authAxiosInstance.get<ResponseDto<ResponseAuth>>(
      API_ENDPOINTS.AUTH.REFRESH
    );
  },
  logout: async (): Promise<void> =>
    await authClient.post(API_ENDPOINTS.AUTH.LOGOUT),
};
