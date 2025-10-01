import { AxiosError, AxiosInstance } from 'axios';

import type { ErrorDTO } from '../dto';
import type { CustomAxiosRequestConfig } from '../types';

interface InterceptorOptions<T> {
  refreshFn: () => Promise<T>;
  onRefreshFailed: (reason: string) => void;
  extractToken: (response: T) => string | undefined;
}

export const setupApiResponseInterceptor = <T>(
  instance: AxiosInstance,
  options: InterceptorOptions<T>
): number => {
  const { refreshFn, onRefreshFailed, extractToken } = options;
  const interceptorId = instance.interceptors.response.use(
    response => response,
    async (error: AxiosError<ErrorDTO>) => {
      if (typeof window === 'undefined') {
        return Promise.reject(error);
      }

      const originalRequest = error.config as CustomAxiosRequestConfig;
      if (!originalRequest) {
        return Promise.reject(error);
      }

      if (error.response?.status === 401) {
        // 토큰 갱신 요청 자체가 401 에러를 받은 경우
        if (originalRequest.url === '/api/auth/refresh') {
          onRefreshFailed('Refresh API returned 401');
          return Promise.reject(error);
        }

        try {
          const response: T = await refreshFn();
          const accessToken = extractToken(response);

          if (accessToken) {
            window.localStorage.setItem('accessToken', accessToken);
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${accessToken}`,
            };
          }

          return await instance(originalRequest);
        } catch (refreshError) {
          // 갱신 요청 중 네트워크 오류 등 예외가 발생한 경우
          onRefreshFailed('Refresh failed');
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return interceptorId;
};
