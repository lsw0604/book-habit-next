import { AuthService, LoginPayload, RegisterPayload } from './types';
import { UserDTO } from '@/entities/user/api';
import { API_ENDPOINTS } from '@/shared/api/constant';
import { ResponseDTO } from '@/shared/api/types/response';
import { authAxiosInstance, authClient } from '@/shared/api/clients';

export const authService: AuthService = {
  login: async (payload: LoginPayload) => {
    const response = await authClient.post<UserDTO>(
      API_ENDPOINTS.AUTH.SIGNIN,
      payload
    );
    return response;
  },
  register: async (payload: RegisterPayload) => {
    const { birthday, ...rest } = payload;
    const apiPayload = {
      ...rest,
      birthday: birthday.toISOString(),
    };
    const response = await authClient.post<UserDTO>(
      API_ENDPOINTS.AUTH.SIGNUP,
      apiPayload
    );

    return response;
  },
  kakao: async (code: string) => {
    const response = await authClient.get<UserDTO>(
      `${API_ENDPOINTS.AUTH.KAKAO}?code=${code}`
    );

    return response;
  },
  access: async () => {
    const response = await authClient.get<UserDTO>(API_ENDPOINTS.AUTH.ACCESS);
    return response;
  },
  refresh: async () => {
    const response = await authAxiosInstance.post<ResponseDTO<UserDTO>>(
      API_ENDPOINTS.AUTH.REFRESH
    );
    return response;
  },
  logout: async () => {
    await authClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
};
