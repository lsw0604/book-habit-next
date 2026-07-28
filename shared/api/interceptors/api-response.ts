import { AxiosError, isAxiosError, type AxiosInstance } from 'axios';

import type { ErrorDTO, CustomAxiosRequestConfig } from '../types';

interface InterceptorOptions<T> {
  refreshFn: () => Promise<T>;
  onRefreshFailed: (reason: string) => void;
  extractToken: (response: T) => string | undefined;
}

let isRefreshing = false;

let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}> = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null
) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const setupApiResponseInterceptor = <T>(
  instance: AxiosInstance,
  options: InterceptorOptions<T>
): number => {
  const { refreshFn, onRefreshFailed, extractToken } = options;

  const interceptorId = instance.interceptors.response.use(
    response => response,
    async (error: AxiosError<ErrorDTO>) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (error.response?.status !== 401 || !originalRequest) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return instance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      isRefreshing = true;

      if (originalRequest.url === '/api/auth/refresh') {
        isRefreshing = false;
        onRefreshFailed('Refresh API returned 401');
        processQueue(error, null);
        return Promise.reject(error);
      }

      try {
        const response: T = await refreshFn();
        const newAccessToken = extractToken(response);

        if (!newAccessToken) {
          throw new Error('New accessToken could not be extracted.');
        }

        window.localStorage.setItem('accessToken', newAccessToken);

        processQueue(null, newAccessToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return await instance(originalRequest);
      } catch (refreshError) {
        if (isAxiosError<ErrorDTO>(refreshError)) {
          processQueue(refreshError, null);
        } else {
          const genericError = new AxiosError(
            'An unexpected error occurred during token refresh.'
          );
          processQueue(genericError, null);
        }

        onRefreshFailed('Refresh failed');
        return await Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );

  return interceptorId;
};
