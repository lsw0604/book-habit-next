import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { axiosConfig } from './config';
import { tokenStorage } from '@/utils/token';
import { getAuthService } from '@/service/auth';

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

interface ExtendedAxiosError extends AxiosError {
  config: RetryConfig;
  response?: AxiosResponse<NestServerErrorType>;
}

export const createAxios = axios.create(axiosConfig);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/**
 * TODO refresh token logic 구현하기
 */
const handleRefreshToken = async () => {};

createAxios.interceptors.request.use(
  (config) => {
    const token = tokenStorage.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

createAxios.interceptors.response.use(
  (response) => {
    const authHeader = response.headers['authorization'];

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      tokenStorage.setToken(token);
    }
    return response;
  },
  async (error: ExtendedAxiosError) => {
    const originalRequest = error.config;
    const authService = getAuthService();

    if (!originalRequest) return Promise.reject(error);
    if (originalRequest._retryCount && originalRequest._retryCount >= 3) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return createAxios(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      isRefreshing = true;

      try {
        await authService.refresh();
        processQueue(null);
        isRefreshing = false;
        return createAxios(originalRequest);
      } catch (err) {
        processQueue(err as Error);
        isRefreshing = false;
        await authService.logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
