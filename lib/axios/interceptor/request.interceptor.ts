import { tokenStorage } from '@/utils/token';
import { AxiosInstance } from 'axios';

const requestInterceptor = (client: AxiosInstance) => {
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

export default requestInterceptor;
