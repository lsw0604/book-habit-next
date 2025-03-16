import Axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from 'axios';
import { NextRouter } from 'next/router';
import { TokenService } from './token-service';

const MAX_RETRY_COUNT = 1;
const isClient = typeof window !== 'undefined';

export class HTTPService {
  private apiClient: AxiosInstance;

  constructor(router?: NextRouter) {
    this.apiClient = Axios.create({
      baseURL: process.env.NEXT_PUBLIC_SERVER,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    if (router) {
      TokenService.setRouter(router);
    }

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor() {
    this.apiClient.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        if (isClient) {
          const accessToken = sessionStorage.getItem('accessToken');
          if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          }
        }
        return config;
      },
      (error: AxiosError): Promise<Error> => {
        return Promise.reject(error);
      }
    );
  }

  private initializeResponseInterceptor() {
    this.apiClient.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
        if (isClient) {
          if (
            response.request.responseURL.includes('/api/auth/signin') ||
            response.request.responseURL.includes('/api/auth/signup') ||
            response.request.responseURL.includes('/api/auth/refresh') ||
            response.request.responseURL.includes('/api/auth/kakao')
          ) {
            const accessToken =
              response.headers['authorization']?.split(' ')[1];
            if (accessToken) {
              sessionStorage.setItem('accessToken', accessToken);
            }
          }
        }
        return response;
      },
      async (error: AxiosError<NestServerErrorType>): Promise<any> => {
        const originalRequest = error.config as any;

        if (isClient) {
          if (
            error.response &&
            error.response.status === 401 &&
            error.request?.responseURL.includes('api/auth/refresh')
          ) {
            /**
             * TODO: 로그아웃 처리
             */
            return Promise.reject(error);
          }

          const isAuthEndpoint =
            originalRequest.url.includes('/api/auth/signin') ||
            originalRequest.url.includes('/api/auth/signup') ||
            originalRequest.url.includes('/api/auth/refresh');

          if (
            error.response?.status === 401 &&
            !isAuthEndpoint &&
            !originalRequest._retry
          ) {
            originalRequest._retry = true;
            originalRequest._retryCount =
              (originalRequest._retryCount || 0) + 1;

            if (originalRequest._retryCount <= MAX_RETRY_COUNT) {
              try {
                /**
                 * TODO: refresh token 요청
                 * TODO: refresh token 성공 시 originalRequest 재요청
                 */
                return this.apiClient(originalRequest);
              } catch (error: any) {
                /**
                 * TODO: 로그아웃 처리
                 * TODO: 로그인 페이지로 리다이렉트
                 */
                this.redirectToLogin();
                return Promise.reject(error);
              }
            } else {
              /**
               * TODO: 로그아웃 처리
               * TODO: 로그인 페이지로 리다이렉트
               */
              this.redirectToLogin();
              return Promise.reject(new Error(`Error: ${error.message}`));
            }
          }
        }

        if (error.response) {
          const { message, path, timestamp, statusCode } = error.response.data;
          console.error(`[${statusCode}][${timestamp}][${path}] : ${message}`);
          return Promise.reject(error);
        } else {
          return Promise.reject(new Error(`Error: ${error.message}`));
        }
      }
    );
  }
}
