import { AxiosInstance } from 'axios';
import { tokenStorage } from '@/shared/utils/token';

export const setupRequestInterceptor = (client: AxiosInstance) => {
  return client.interceptors.request.use(
    config => {
      const token = tokenStorage.getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    error => Promise.reject(error)
  );
};
