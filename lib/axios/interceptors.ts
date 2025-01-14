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

/**
 * TODO : interceptor 마무리
 */
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
          await refreshTokenAPI();
          processQueue();
          error.config.headers.Authorization = `Bea`;
          return client(originalRequest);
        } catch (err) {}
      }
    }
  );
};
