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

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface ExtendedAxiosError extends AxiosError {
  config: RetryConfig;
  response?: AxiosResponse<NestServerErrorType>;
}

/**
 * TODO 다시 인터셉터랑 분리해보기
 */
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
      const AuthService = getAuthService();

      if (!originalRequest) return Promise.reject(error);
      if (originalRequest.url?.includes('/logout')) {
        console.log('lo');
        return Promise.reject(error);
      }

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
          // 1. refreshTokenAPI는 Authorization Header에 Bearer Token 형식으로 JWT 토큰을 보내줌
          // 2. createResponseInterceptors에서 Authorization Header에 Token을 session에 저장함
          await AuthService.refresh();
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
