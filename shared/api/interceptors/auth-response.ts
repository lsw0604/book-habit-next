import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import type { ErrorDTO, ResponseDTO } from '../types';

interface InterceptorOptions<T> {
  extractToken: (response: T) => string | undefined;
}

export const setupAuthResponseInterceptor = <T>(
  instance: AxiosInstance,
  options: InterceptorOptions<T>
) => {
  const { extractToken } = options;
  const interceptorId = instance.interceptors.response.use(
    (response: AxiosResponse<ResponseDTO<T>>) => {
      const responseDTO = response.data;

      if (responseDTO.success) {
        const accessToken = extractToken(responseDTO.data);

        if (accessToken) {
          window.localStorage.setItem('accessToken', accessToken);
        }
      }

      return response;
    },
    async (error: AxiosError<ErrorDTO>) => Promise.reject(error)
  );

  return interceptorId;
};
