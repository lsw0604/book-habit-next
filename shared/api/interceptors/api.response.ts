import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { extractAndSaveToken } from '../utils/extract-and-save-token';
import { ErrorResponseDTO } from '../types/error';
import { CustomAxiosRequestConfig } from '../types/axios';
import { authEvents } from '@/entities/auth/model';
import { UserDTO } from '@/entities/user/api';
import { ResponseDTO } from '../types/response';

export const setupApiResponseInterceptor = (
  instance: AxiosInstance,
  refreshFn: () => Promise<AxiosResponse<ResponseDTO<UserDTO>>>
) => {
  return instance.interceptors.response.use(
    response => {
      extractAndSaveToken(response);

      return response;
    },
    async (error: AxiosError<ErrorResponseDTO>) => {
      if (typeof window === 'undefined') {
        /**
         * TODO 브라우저 환경이 아니면 에러 처리
         */
        return Promise.reject(error);
      }

      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (!originalRequest) {
        /**
         * TODO originalRequest가 없으면 에러치리
         */
        return Promise.reject(error);
      }

      if (error.response?.status === 401 || error.response?.status === 403) {
        if (
          error.response?.status === 401 &&
          originalRequest.url === '/api/auth/refresh'
        ) {
          /**
           * TODO 리프레쉬 토큰에서 401에러가 발생 => 로그아웃 처리
           */
          authEvents.emitLogout();
          return Promise.reject(error);
        }

        try {
          const response = await refreshFn();
          const newToken = response.headers['authorization']?.split(' ')[1];

          if (!newToken) {
            /**
             * TODO refreshAPI로 부터 토큰을 받아 오지 못함 => 에러처리
             */
          }

          extractAndSaveToken(response);

          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };

          return instance(originalRequest);
        } catch (refreshError) {
          authEvents.emitLogout();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};
