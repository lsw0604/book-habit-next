import type { AxiosError, AxiosInstance } from 'axios';

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
    /**
     * @description API 요청이 성공한 경우, 받은 응답을 그대로 반환합니다.
     */
    response => response,
    /**
     * @description API 요청이 실패한 경우, 에러를 처리합니다.
     * @async
     */
    async (error: AxiosError<ErrorDTO>) => {
      /**
       * @description 서버 사이드 렌더링(SSR) 중에는 window 객체가 없으므로,
       * 브라우저 환경에서만 토큰 재발급 로직을 실행합니다.
       */
      if (typeof window === 'undefined') {
        return Promise.reject(error);
      }

      /**
       * @description 재요청에 필요한 원래 요청 정보를 `error.config`에서 가져옵니다.
       */
      const originalRequest = error.config as CustomAxiosRequestConfig;
      if (!originalRequest) {
        return Promise.reject(error);
      }

      /**
       * @description 응답 상태 코드가 401(Unauthorized)인 경우에만 토큰 재발급을 시도합니다.
       */
      if (error.response?.status === 401) {
        /**
         * @description 토큰 재발급 요청 자체(/api/auth/refresh)가 401 에러를 받은 경우,
         * 이는 리프레시 토큰이 만료되었음을 의미하므로 무한 루프를 방지하기 위해 즉시 실패 처리합니다.
         */
        if (originalRequest.url === '/api/auth/refresh') {
          onRefreshFailed('Refresh API returned 401');
          return Promise.reject(error);
        }

        try {
          /**
           * @description 토큰 재발급 함수를 호출하고 새로운 토큰을 받습니다.
           */
          const response: T = await refreshFn();
          const accessToken = extractToken(response);

          if (accessToken) {
            /**
             * @description 새로운 accessToken을 localStorage에 저장합니다.
             */
            window.localStorage.setItem('accessToken', accessToken);
            /**
             * @description 실패했던 원래 요청의 헤더에 새로운 accessToken을 설정합니다.
             */
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
          }

          /**
           * @description 새로운 토큰으로 원래 요청을 다시 시도합니다.
           */
          return await instance(originalRequest);
        } catch (refreshError) {
          /**
           * @description 토큰 재발급 과정에서 네트워크 오류 등 다른 에러가 발생한 경우 실패 처리합니다.
           */
          onRefreshFailed('Refresh failed');
          return Promise.reject(refreshError);
        }
      }

      /**
       * @description 401 에러가 아닌 다른 모든 에러는 그대로 실패 처리합니다.
       */
      return Promise.reject(error);
    }
  );

  return interceptorId;
};
