import Axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { refreshTokenAPI, logoutAPI } from './auth';

const MAX_RETRY_COUNT = 1;

const isClient = typeof window !== 'undefined';

export const apiClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
  withCredentials: true,
});

apiClient.interceptors.request.use(
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

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    if (isClient) {
      if (
        response.request.responseURL.includes('/api/auth/signin') ||
        response.request.responseURL.includes('/api/auth/signup') ||
        response.request.responseURL.includes('/api/auth/refresh')
      ) {
        const accessToken = response.headers['authorization'].split(' ')[1];
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
        error.request &&
        error.request.responseURL.includes('api/auth/refresh')
      ) {
        await logoutAPI();

        return Promise.reject(error);
      }

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        originalRequest._retryCount = (originalRequest._retryCount || 0) + 1;

        if (originalRequest._retryCount <= MAX_RETRY_COUNT) {
          await refreshTokenAPI();

          return apiClient(originalRequest);
        } else {
          await logoutAPI();
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
