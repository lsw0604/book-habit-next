import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_ENDPOINTS } from './constant';
import { tokenStorage } from '@/utils/token';
import { refreshTokenAPI } from '@/service/auth';

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface ExtendedAxiosError extends AxiosError {
  config: RetryConfig;
  response?: AxiosResponse<NestServerErrorType>;
}

export const createRequestInterceptor = (client: AxiosInstance) => {
  return client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = tokenStorage.getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

export const createResponseInterceptor = (client: AxiosInstance) => {
  let isRefreshing = false;
  let failedQueue: { resolve: Function; reject: Function }[] = [];

  const processQueue = (error: any = null) => {
    failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve();
      }
    });
    failedQueue = [];
  };

  return client.interceptors.response.use(
    (response) => {
      const isAuthEndPoint = Object.values(API_ENDPOINTS.AUTH).some(
        (endPoint) => response.request?.responseURL.includes(endPoint)
      );

      if (isAuthEndPoint) {
        const token: string | null =
          response.headers['authorization']?.split(' ')[1];
        if (token) tokenStorage.setToken(token);
      }

      return response;
    },
    async (error: ExtendedAxiosError) => {
      const originalRequest = error.config;
      if (!originalRequest) return Promise.reject(error);

      if (error.response?.status === 401 && !originalRequest?._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => client(originalRequest))
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // 1. refreshTokenAPI는 Authorization Header에 Bearer Token 형식으로 JWT 토큰을 보내줌
          // 2. createResponseInterceptors에서 Authorization Header에 Token을 session에 저장함
          await refreshTokenAPI();
          processQueue();
          return client(originalRequest);
        } catch (err) {
          processQueue(err);
          throw err;
        } finally {
          isRefreshing = false;
        }
      }
      return Promise.reject(error);
    }
  );
};
