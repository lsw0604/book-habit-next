import { AxiosError, isAxiosError, type AxiosInstance } from 'axios';

import type { ErrorDTO } from '../dto';
import type { CustomAxiosRequestConfig } from '../types';

/**
 * @interface InterceptorOptions
 * @description `setupApiResponseInterceptor`에 전달될 옵션들의 타입입니다.
 * @template T - 토큰 재발급 API(`refreshFn`)의 응답 데이터 타입을 의미합니다.
 */
interface InterceptorOptions<T> {
  /**
   * @description 토큰 재발급을 요청하는 함수입니다.
   * @returns {Promise<T>} 토큰 재발급 API의 응답 데이터를 포함하는 Promise.
   */
  refreshFn: () => Promise<T>;
  /**
   * @description 토큰 재발급 실패 시 호출될 콜백 함수입니다. (ex: 강제 로그아웃 처리)
   * @param {string} reason - 재발급 실패 원인.
   */
  onRefreshFailed: (reason: string) => void;
  /**
   * @description `refreshFn`의 응답(T)에서 accessToken 문자열을 추출하는 함수입니다.
   * @param {T} response - `refreshFn`으로부터 받은 응답 데이터.
   * @returns {string | undefined} 추출된 accessToken 또는 undefined.
   */
  extractToken: (response: T) => string | undefined;
}

// --- 동시 다발적인 401 에러 처리를 위한 변수 ---

/**
 * @description 토큰 재발급이 현재 진행 중인지를 나타내는 플래그.
 */
let isRefreshing = false;

/**
 * @description 토큰 재발급을 기다리는 요청들을 저장하는 큐.
 * 각 요소는 실패한 요청을 다시 시작하거나 거부하는 Promise의 resolve/reject 함수를 포함합니다.
 */
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}> = [];

/**
 * @description 대기 큐에 쌓인 모든 요청을 처리하는 함수.
 * @param error - 재발급 과정에서 에러가 발생한 경우 전달.
 * @param token - 재발급에 성공한 경우 새로운 토큰 전달.
 */
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

/**
 * @function setupApiResponseInterceptor
 * @description API용 Axios 인스턴스에 401 에러 처리 응답 인터셉터를 설정합니다.
 * @template T - `refreshFn`의 응답 데이터 타입.
 * @param {AxiosInstance} instance - 인터셉터를 추가할 Axios 인스턴스.
 * @param {InterceptorOptions<T>} options - 인터셉터의 동작을 제어하는 옵션 객체.
 * @returns {number} 생성된 인터셉터의 ID (나중에 `eject`로 제거하기 위해 필요).
 */
export const setupApiResponseInterceptor = <T>(
  instance: AxiosInstance,
  options: InterceptorOptions<T>
): number => {
  const { refreshFn, onRefreshFailed, extractToken } = options;

  const interceptorId = instance.interceptors.response.use(
    response => response,
    async (error: AxiosError<ErrorDTO>) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      // 401 에러가 아니거나, 재요청에 필요한 정보가 없으면 즉시 에러를 반환합니다.
      if (error.response?.status !== 401 || !originalRequest) {
        return Promise.reject(error);
      }

      // 토큰 재발급이 이미 진행 중인 경우, 현재 요청을 대기 큐에 추가합니다.
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

      // 첫 401 에러 발생 시, 토큰 재발급 프로세스를 시작합니다.
      isRefreshing = true;

      // 토큰 재발급 요청 자체가 401 에러를 받은 경우 (무한 루프 방지)
      if (originalRequest.url === '/api/auth/refresh') {
        isRefreshing = false;
        onRefreshFailed('Refresh API returned 401');
        processQueue(error, null); // 대기 중인 모든 요청을 실패 처리합니다.
        return Promise.reject(error);
      }

      try {
        const response: T = await refreshFn();
        const newAccessToken = extractToken(response);

        if (!newAccessToken) {
          throw new Error('New accessToken could not be extracted.');
        }

        window.localStorage.setItem('accessToken', newAccessToken);

        // 대기 큐에 있던 모든 요청을 새로운 토큰으로 성공 처리합니다.
        processQueue(null, newAccessToken);

        // 현재 실패했던 원래 요청도 새로운 토큰으로 재시도합니다.
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return await instance(originalRequest);
      } catch (refreshError) {
        // isAxiosError 타입 가드를 사용하여 refreshError가 AxiosError인지 확인합니다.
        if (isAxiosError<ErrorDTO>(refreshError)) {
          // AxiosError인 경우, 대기 큐에 해당 에러를 그대로 전파합니다.
          processQueue(refreshError, null);
        } else {
          // AxiosError가 아닌 다른 예외(네트워크 문제 등)가 발생한 경우,
          // 새로운 Error 객체를 만들어 대기 큐에 전파합니다.
          const genericError = new AxiosError(
            'An unexpected error occurred during token refresh.'
          );
          processQueue(genericError, null);
        }

        onRefreshFailed('Refresh failed');
        return await Promise.reject(refreshError);
      } finally {
        // 모든 과정이 끝나면 플래그를 초기화합니다.
        isRefreshing = false;
      }
    }
  );

  return interceptorId;
};
