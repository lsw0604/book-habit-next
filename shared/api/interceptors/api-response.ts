import {
  AxiosError,
  isAxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from 'axios';

import { API_ENDPOINTS } from '../constants';
import type { ErrorDTO } from '../types';

interface InterceptorOptions {
  refreshFn: () => Promise<void>;
  onRefreshFailed: (reason: string) => void;
}

let isRefreshing = false;

let failedQueue: Array<{
  resolve: () => void;
  reject: (error: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve();
    }
  });

  failedQueue = [];
};

export const setupApiResponseInterceptor = (
  instance: AxiosInstance,
  options: InterceptorOptions
): number => {
  const { refreshFn, onRefreshFailed } = options;

  const interceptorId = instance.interceptors.response.use(
    response => response,
    async (error: AxiosError<ErrorDTO>) => {
      const originalRequest = error.config as
        | InternalAxiosRequestConfig
        | undefined;

      if (error.response?.status !== 401 || !originalRequest) {
        return Promise.reject(error);
      }

      if (originalRequest.url === API_ENDPOINTS.AUTH.REFRESH) {
        onRefreshFailed('Refresh API returned 401');
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => instance(originalRequest));
      }

      isRefreshing = true;

      try {
        await refreshFn();
        processQueue(null);
        return await instance(originalRequest);
      } catch (refreshError) {
        const rejection = isAxiosError<ErrorDTO>(refreshError)
          ? refreshError
          : new AxiosError(
              'An unexpected error occurred during token refresh.'
            );

        processQueue(rejection);
        onRefreshFailed('Refresh failed');
        return await Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );

  return interceptorId;
};
