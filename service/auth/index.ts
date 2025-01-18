import { createClient } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/axios/constant';

interface AuthService {
  login: (payload: RequestLogin) => Promise<ResponseAuth>;
  register: (payload: RequestRegister) => Promise<ResponseAuth>;
  kakao: (code: string) => Promise<ResponseAuth>;
  logout: () => Promise<void>;
  refresh: () => Promise<ResponseAuth>;
}

export const createAuthService = (): AuthService => {
  const client = createClient();

  return {
    login: (payload: RequestLogin) =>
      client.post<ResponseAuth, RequestLogin>(API_ENDPOINTS.AUTH.SIGNIN, {
        data: payload,
      }),
    register: (payload: RequestRegister) =>
      client.post<ResponseAuth, RequestRegister>(API_ENDPOINTS.AUTH.SIGNUP, {
        data: payload,
      }),
    kakao: (code: string) =>
      client.get<ResponseAuth>(
        `${API_ENDPOINTS.AUTH.KAKAO}/callback?code=${encodeURIComponent(code)}`
      ),
    logout: () => client.post(API_ENDPOINTS.AUTH.LOGOUT),
    refresh: () => client.get<ResponseAuth>(API_ENDPOINTS.AUTH.REFRESH),
  };
};

let authServiceInstance: ReturnType<typeof createAuthService> | null = null;

export const getAuthService: () => AuthService = (): AuthService => {
  if (!authServiceInstance) {
    authServiceInstance = createAuthService();
  }
  return authServiceInstance;
};
