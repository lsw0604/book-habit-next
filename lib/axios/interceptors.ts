import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { API_ENDPOINTS } from './constant';
import { tokenStorage } from '@/utils/token';
import { getAuthService } from '@/service/auth';
import { createAxios } from './axios';
import { authEvents } from '@/events/auth';

interface RequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface ExtendedAxiosError extends AxiosError {
  config: RequestConfig;
  response?: AxiosResponse<NestServerErrorType>;
}

export const setUpAxiosInterceptor = (onAuthError: () => void) => {
  return createAxios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    async (error: ExtendedAxiosError) => {
      const originalRequest = error.config;
      const authService = getAuthService();

      if (error.response?.status === 401 && !originalRequest?._retry) {
        originalRequest._retry = true;

        try {
          await authService.refresh();
          return createAxios(originalRequest);
        } catch (err) {
          onAuthError();
          throw err;
        }
      }
      return Promise.reject(error);
    }
  );
};

export const createRequestInterceptor = (client: AxiosInstance) => {
  return client.interceptors.request.use(
    (config: RequestConfig) => {
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
  const queue: { resolve: Function; reject: Function }[] = [];

  const processQueue = (error: any = null) => {
    queue.forEach(({ resolve, reject }) => {
      error ? reject(error) : resolve();
    });
    queue.length = 0;
  };

  return client.interceptors.response.use(
    (response: AxiosResponse) => {
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
      const AuthService = getAuthService();

      if (error.response?.status === 401 && !originalRequest?._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            queue.push({ resolve, reject });
          })
            .then(() => client(originalRequest))
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;
        try {
          authEvents.emitSessionExpired();
          processQueue();
          return client(originalRequest);
        } catch (err) {
          await AuthService.logout();
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
