import { createClient } from '@/lib/axios';
import { apiClient } from '../api-client';
import { API_ENDPOINTS } from '@/lib/axios/constant';

// const AUTH_URL = '/api/auth';

// export const loginAPI = async (payload: RequestLogin) => {
//   const { data } = await apiClient.post<ResponseAuth>(
//     `${AUTH_URL}/signin`,
//     JSON.stringify(payload)
//   );

//   return data;
// };

// export const kakaoLoginAPI = async (code: string) => {
//   const encodedCode = encodeURIComponent(code);
//   const { data } = await apiClient.get<ResponseAuth>(
//     `${AUTH_URL}/kakao/callback?code=${encodedCode}`
//   );
//   return data;
// };

// export const registerAPI = async (payload: RequestRegister) => {
//   const { data } = await apiClient.post<ResponseAuth>(
//     `${AUTH_URL}/signup`,
//     JSON.stringify(payload)
//   );

//   return data;
// };

// export const logoutAPI = async () => {
//   const { data } = await apiClient.get<ResponseLogout>(`${AUTH_URL}/logout`);
//   return data;
// };

// export const refreshTokenAPI = async () => {
//   const { data } = await apiClient.get<ResponseAuth>(`${AUTH_URL}/refresh`);
//   return data;
// };

export const createAuthService = () => {
  const client = createClient();

  return {
    login: (payload: RequestLogin) =>
      client.post<ResponseAuth>(API_ENDPOINTS.AUTH.SIGNIN, payload),
    register: (payload: RequestRegister) =>
      client.post<ResponseAuth>(API_ENDPOINTS.AUTH.SIGNUP, payload),
    kakao: (code: string) =>
      client.get<ResponseAuth>(
        `${API_ENDPOINTS.AUTH.KAKAO}/callback?code=${encodeURIComponent(code)}`
      ),
    logout: () => client.get<ResponseLogout>(API_ENDPOINTS.AUTH.LOGOUT),
    refresh: () => client.get<ResponseAuth>(API_ENDPOINTS.AUTH.REFRESH),
  };
};

let authServiceInstance: ReturnType<typeof createAuthService> | null = null;

export const getAuthService = () => {
  if (!authServiceInstance) {
    authServiceInstance = createAuthService();
  }
  return authServiceInstance;
};
