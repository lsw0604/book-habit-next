import { AxiosInstance } from 'axios';
import { tokenService } from '@/entities/auth/lib/token';

export const setupRequestInterceptor = (client: AxiosInstance) => {
  return client.interceptors.request.use(
    config => {
      const token = tokenService.getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => Promise.reject(error)
  );
};
