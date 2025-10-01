import { authClient } from '@/shared/api/clients/auth';
import { API_ENDPOINTS } from '@/shared/api/constant';

import { AuthDTO } from './auth.dto';
import { AuthService, LoginPayload, RegisterPayload } from './types';

export const authService: AuthService = {
  login: async (payload: LoginPayload): Promise<AuthDTO> => {
    const response: AuthDTO = await authClient.post<AuthDTO>(
      API_ENDPOINTS.AUTH.SIGNIN,
      payload
    );
    return response;
  },
  register: async (payload: RegisterPayload): Promise<AuthDTO> => {
    const { birthday, ...rest } = payload;
    const apiPayload = {
      ...rest,
      birthday: birthday.toISOString(),
    };
    const response: AuthDTO = await authClient.post<AuthDTO>(
      API_ENDPOINTS.AUTH.SIGNUP,
      apiPayload
    );

    return response;
  },
  kakao: async (code: string): Promise<AuthDTO> => {
    const response: AuthDTO = await authClient.get<AuthDTO>(
      `${API_ENDPOINTS.AUTH.KAKAO}?code=${code}`
    );

    return response;
  },
  access: async (): Promise<AuthDTO> => {
    const response: AuthDTO = await authClient.get<AuthDTO>(
      API_ENDPOINTS.AUTH.ACCESS
    );
    return response;
  },
  refresh: async (): Promise<AuthDTO> => {
    const response: AuthDTO = await authClient.post<AuthDTO>(
      API_ENDPOINTS.AUTH.REFRESH
    );
    return response;
  },
  logout: async (): Promise<AuthDTO> => {
    const response: AuthDTO = await authClient.post<AuthDTO>(
      API_ENDPOINTS.AUTH.LOGOUT
    );
    return response;
  },
};
