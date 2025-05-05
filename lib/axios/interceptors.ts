import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { tokenStorage } from '@/utils/token';
import { API_ENDPOINTS, MAX_RETRY_COUNT, isClient } from './constant';

interface RequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _retryCount?: number;
}

interface ExtendedAxiosError extends AxiosError {
  config: RequestConfig;
  response?: AxiosResponse<NestServerErrorType>;
}

const isAuthEndPoint = (url?: string) =>
  Object.values(API_ENDPOINTS.AUTH).some(endPoint => url?.includes(endPoint));

/**
 * TODO 순환 참조 에러 해결하기 의존성 분리하기
 */
export const createRequestInterceptor = (client: AxiosInstance) => {
  return client.interceptors.request.use(
    (config: RequestConfig) => {
      const token = tokenStorage.getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => Promise.reject(error)
  );
};

export const createResponseInterceptor = (client: AxiosInstance) => {
  return client.interceptors.response.use(
    (response: AxiosResponse) => {
      if (isClient) {
        console.log(isAuthEndPoint(response.request?.responseURL));
        if (isAuthEndPoint(response.request?.responseURL)) {
          const accessToken = response.headers['authorization']?.split(' ')[1];
          console.log(accessToken);
          if (accessToken) {
            tokenStorage.setToken(accessToken);
          }
        }
      }
      return response;
    },
    async (error: ExtendedAxiosError) => {
      const originalRequest = error.config;

      if (isClient) {
        if (
          error.response?.status === 401 &&
          error.request?.responseURL.includes(API_ENDPOINTS.AUTH.REFRESH)
        ) {
          console.log('1 logout!');
          return Promise.reject(error);
        }

        if (
          error.response?.status === 401 &&
          !isAuthEndPoint(error.request?.responseURL) &&
          !originalRequest?._retry
        ) {
          originalRequest._retry = true;
          originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

          if (originalRequest._retryCount <= MAX_RETRY_COUNT) {
            try {
              const response = await client.get(API_ENDPOINTS.AUTH.REFRESH);
              console.log(response);
              return client(originalRequest);
            } catch (err: any) {
              console.log('2 logout!');
              return Promise.reject(err);
            }
          } else {
            console.log('3 logout!');
            return Promise.reject(error);
          }
        }
      }
      return Promise.reject(error);
    }
  );
};
