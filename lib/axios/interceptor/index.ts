import { tokenStorage } from '@/utils/token';
import { AxiosInstance } from 'axios';
import { API_ENDPOINTS, MAX_RETRY_COUNT } from '../constant';

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

const isClient = typeof window === undefined;

const isAuthEndPoint = (url?: string) =>
  Object.values(API_ENDPOINTS.AUTH).some(endPoint => url?.includes(endPoint));

export const setupResponseInterceptor = (client: AxiosInstance) => {
  return client.interceptors.response.use(
    response => {
      if (isClient) {
        const accessToken = response.headers['Authorization']?.split(' ')[1];

        if (accessToken) {
          tokenStorage.setToken(accessToken);
        }
      }

      return response;
    },
    async error => {
      const originalRequest = error.config;

      if (isClient) {
        if (
          // REFRESH TOKEN에서 401 에러가 발생하면 logout을 실행함
          error.response?.status === 401 &&
          error.request?.responseURL.includes(API_ENDPOINTS.AUTH.REFRESH)
        ) {
          // logout API
          return Promise.reject(error);
        }

        if (
          error.response?.status === 401 &&
          !isAuthEndPoint(error.request?.responseURL) &&
          !originalRequest?._retry
        ) {
          originalRequest._retry = true;
          originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

          if (originalRequest._retryCount <= MAX_RETRY_COUNT) {
            try {
              // REFRESH TOKEN을 사용해서 ACCESS TOKEN을 재발급 받는 API
              return client(originalRequest);
            } catch (err) {
              return Promise.reject(err);
            }
          }
        }
      }
      return Promise.reject(error);
    }
  );
};
