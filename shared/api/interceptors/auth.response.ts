import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import type { ErrorDTO, ResponseDTO } from '../dto';

/**
 * @interface InterceptorOptions
 * @description `setupAuthResponseInterceptor`에 전달될 옵션들의 타입입니다.
 * @template T - API의 실제 응답 데이터(`data`) 타입을 의미합니다.
 */
interface InterceptorOptions<T> {
  /**
   * @description API 응답 데이터(T)에서 accessToken 문자열을 추출하는 함수입니다.
   * @param {T} response - API 응답의 `data` 필드.
   * @returns {string | undefined} 추출된 accessToken 또는 undefined.
   */
  extractToken: (response: T) => string | undefined;
}

/**
 * @function setupAuthResponseInterceptor
 * @description 인증(Auth)용 Axios 인스턴스에 성공 응답 처리 인터셉터를 설정합니다.
 * @template T - API 응답의 `data` 타입.
 * @param {AxiosInstance} instance - 인터셉터를 추가할 Axios 인스턴스.
 * @param {InterceptorOptions<T>} options - 인터셉터의 동작을 제어하는 옵션 객체.
 * @returns {number} 생성된 인터셉터의 ID (나중에 `eject`로 제거하기 위해 필요).
 */
export const setupAuthResponseInterceptor = <T>(
  instance: AxiosInstance,
  options: InterceptorOptions<T>
) => {
  const { extractToken } = options;
  const interceptorId = instance.interceptors.response.use(
    /**
     * @description API 요청이 성공했을 때 실행되는 핸들러입니다.
     * @param {AxiosResponse<ResponseDTO<T>>} response - Axios 응답 객체.
     */
    (response: AxiosResponse<ResponseDTO<T>>) => {
      const responseDTO = response.data;

      /**
       * @description API 응답이 성공(`success: true`)한 경우에만 토큰 추출을 시도합니다.
       */
      if (responseDTO.success) {
        /**
         * @description `extractToken` 함수를 사용해 실제 데이터에서 accessToken을 추출합니다.
         */
        const accessToken = extractToken(responseDTO.data);

        if (accessToken) {
          /**
           * @description 추출된 accessToken을 localStorage에 저장합니다.
           * 서버 사이드 렌더링 환경을 고려하여 `window` 객체의 존재 여부를 확인해야 하지만,
           * 이 인터셉터는 로그인/회원가입 등 클라이언트 측에서만 발생하는 액션에 사용되므로 생략될 수 있습니다.
           * (보다 안전한 코드를 위해 `if (typeof window !== 'undefined' && accessToken)` 사용을 권장합니다.)
           */
          window.localStorage.setItem('accessToken', accessToken);
        }
      }

      return response;
    },
    /**
     * @description API 요청이 실패한 경우, 받은 에러를 그대로 반환합니다.
     * @param {AxiosError<ErrorDTO>} error
     */
    async (error: AxiosError<ErrorDTO>) => Promise.reject(error)
  );

  return interceptorId;
};
