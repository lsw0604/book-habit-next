import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { tokenStorage } from '@/utils/token';
import { authService } from '@/service/api/auth';
import { API_ENDPOINTS, MAX_RETRY_COUNT, isClient } from './constant';

interface RequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

interface ExtendedAxiosError extends AxiosError {
  config: RequestConfig;
  response?: AxiosResponse<NestServerErrorType>;
}

const isAuthEndPoint = (url?: string) =>
  Object.values(API_ENDPOINTS.AUTH).some(endPoint => url?.includes(endPoint));

export const createRequestInterceptor = (client: AxiosInstance) => {
  return client.interceptors.request.use(
    (config: RequestConfig) => {
      const token = tokenStorage.getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
};

export const createResponseInterceptor = (client: AxiosInstance) => {
  const authServiceInstance = authService();

  return client.interceptors.response.use(
    (response: AxiosResponse) => {
      if (isClient) {
        if (isAuthEndPoint(response.request?.responseURL)) {
          const accessToken = response.headers['authorization']?.split(' ')[1];
          if (accessToken) {
            tokenStorage.setToken(accessToken);
          }
        }
      }
      return response;
    },
    async (error: ExtendedAxiosError) => {
      const originalRequest = error.config;

      if (isClient) {
        if (
          error.response?.status === 401 &&
          error.request?.responseURL.includes(API_ENDPOINTS.AUTH.REFRESH)
        ) {
          authServiceInstance.logout();
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
              const response = authServiceInstance.refresh();
              return client(originalRequest);
            } catch (err: any) {
              authServiceInstance.logout();
              return Promise.reject(err);
            }
          } else {
            authServiceInstance.logout();
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};
