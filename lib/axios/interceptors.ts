import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_ENDPOINTS } from './constant';
import { tokenStorage } from '@/utils/token';

interface RequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

interface ExtendedAxiosError extends AxiosError {
  config: RequestConfig;
  response?: AxiosResponse<NestServerErrorType>;
}

const isClient = typeof window !== 'undefined';
const MAX_RETRY_COUNT = 1;

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
  return client.interceptors.response.use(
    (response: AxiosResponse) => {
      if (isClient) {
        const isAuthEndPoint = Object.values(API_ENDPOINTS.AUTH).some(
          endPoint => response.request?.responseURL.includes(endPoint)
        );

        if (isAuthEndPoint) {
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
          /**
           * TODO: 로그아웃 처리
           */
          return Promise.reject(error);
        }

        const isAuthEndPoint = Object.values(API_ENDPOINTS.AUTH).some(
          endPoint => error.request?.responseURL.includes(endPoint)
        );

        if (
          error.response?.status === 401 &&
          !isAuthEndPoint &&
          !originalRequest?._retry
        ) {
          originalRequest._retry = true;
          originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

          if (originalRequest._retryCount <= MAX_RETRY_COUNT) {
            try {
              /**
               * TODO: refresh token
               */
              return client(originalRequest);
            } catch (err: any) {
              /**
               * TODO: 로그아웃 처리
               */
              return Promise.reject(err);
            }
          } else {
            /**
             * TODO: 로그아웃 처리
             */
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};
