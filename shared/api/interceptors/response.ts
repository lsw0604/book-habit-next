import { AxiosError, AxiosInstance } from 'axios';

import { authService } from '@/entities/auth/api';
import { authEvents } from '@/entities/auth/model';
import { isClient } from '@/shared/utils/is-client';

import { API_ENDPOINTS, MAX_RETRY_COUNT } from '../constant';
import { CustomAxiosRequestConfig } from '../types/axios';
import { ErrorResponseDTO } from '../types/error';
import { extractAndSaveToken } from '../utils/extract-and-save-token';

let isRefreshing = false;
let requestQueue: ((token: string) => void)[] = [];

/**
 * 대기 중인 요청 큐 처리
 */
const processQueue = (token: string) => {
  requestQueue.forEach(callback => callback(token));
  requestQueue = [];
};

/**
 * 큐 초기화 및 실패 처리
 */
const rejectQueue = (error: Error) => {
  // 실제 구현에서는 각 Promise에 reject를 호출하는 로직이 필요할 수 있음
  requestQueue = [];
  return Promise.reject(error);
};

const isAuthEndPoint = (url?: string) =>
  Object.values(API_ENDPOINTS.AUTH).some(endPoint => url?.includes(endPoint));

export const setupAuthResponseInterceptor = (client: AxiosInstance) =>
  client.interceptors.response.use(
    response => {
      extractAndSaveToken(response);

      return response;
    },
    async (error: AxiosError<ErrorResponseDTO>) => Promise.reject(error)
  );

export const setupApiResponseInterceptor = (client: AxiosInstance) =>
  client.interceptors.response.use(
    response => {
      extractAndSaveToken(response);

      return response;
    },
    async (error: AxiosError<ErrorResponseDTO>) => {
      // 브라우저 환경이 아니면 처리하지 않음
      if (!isClient) {
        console.log('isClient');
        return Promise.reject(error);
      }

      const originalRequest = error.config as CustomAxiosRequestConfig;

      // originalRequest가 없으면 처리하지 않음
      if (!originalRequest) {
        console.log('no original_request');
        return Promise.reject(error);
      }

      // 리프레시 토큰 API에서 401 에러 발생 시 - 로그아웃 처리
      if (
        error.response?.status === 401 &&
        originalRequest.url === '/api/auth/refresh'
      ) {
        console.log('refresh token error');
        authEvents.emitLogout();
        return Promise.reject(error);
      }

      // 인증 에러이고, 인증 관련 엔드포인트가 아니고, 아직 재시도하지 않은 경우
      if (
        error.response?.status === 401 &&
        !isAuthEndPoint(originalRequest.url) &&
        !originalRequest.retry
      ) {
        originalRequest.retry = true;
        originalRequest.retryCount = (originalRequest.retryCount || 0) + 1;

        // 최대 재시도 횟수 초과 검사
        if (originalRequest.retryCount > MAX_RETRY_COUNT) {
          await authService.logout();
          authEvents.emitLogout();
          return Promise.reject(error);
        }

        // 이미 토큰 갱신 중인 경우 - 큐에 요청 추가
        if (isRefreshing) {
          return new Promise(resolve => {
            requestQueue.push((token: string) => {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
              };
              resolve(client(originalRequest));
            });
          });
        }

        // 토큰 갱신 시작
        isRefreshing = true;

        try {
          // 토큰 갱신 요청
          const response = await authService.refresh();
          const newToken = response.headers.authorization?.split(' ')[1];

          if (!newToken) {
            throw new Error('No Authorization header returned');
          }

          // 새 토큰 저장
          extractAndSaveToken(response);

          // 사용자 정보가 응답에 포함된 경우 로그인 이벤트 발생

          // 기존 요청 헤더 업데이트
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };

          // 대기 중인 요청 처리
          processQueue(newToken);

          // 원래 요청 재시도
          return await client(originalRequest);
        } catch (refreshError) {
          // 토큰 갱신 실패 - 로그아웃 처리
          authEvents.emitLogout();
          await authService.logout();
          rejectQueue(refreshError as Error);
          return await Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
