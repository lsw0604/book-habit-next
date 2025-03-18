import type {
  AuthService,
  RequestLogin,
  RequestRegister,
  RequestKakao,
  ResponseAuth,
} from '@/service/api/auth/types';

import axiosInstance from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/axios/constant';
import { isClient } from '@/lib/axios/constant';

let authServiceInstance: AuthService | null = null;

export const createAuthService = (): AuthService => {
  if (isClient && authServiceInstance) {
    return authServiceInstance;
  }

  const client = axiosInstance;

  const service: AuthService = {
    login: async (payload: RequestLogin) => {
      const response = await client.post<ResponseAuth>(
        API_ENDPOINTS.AUTH.SIGNIN,
        payload
      );

      return response.data;
    },
    register: async (payload: RequestRegister) => {
      const response = await client.post<ResponseAuth>(
        API_ENDPOINTS.AUTH.SIGNUP,
        payload
      );
      return response.data;
    },
    kakao: async ({ code }: RequestKakao) => {
      const response = await client.get<ResponseAuth>(
        `${API_ENDPOINTS.AUTH.KAKAO}/callback?code=${encodeURIComponent(code)}`
      );
      return response.data;
    },
    logout: async () => {
      await client.post(API_ENDPOINTS.AUTH.LOGOUT);
    },
    refresh: async () => {
      const response = await client.get<ResponseAuth>(
        API_ENDPOINTS.AUTH.REFRESH
      );
      return response.data;
    },
  };
  if (isClient) {
    authServiceInstance = service;
  }

  return service;
};

export const authService = (): AuthService => {
  return createAuthService();
};
