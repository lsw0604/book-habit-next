import Axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosInstance,
} from 'axios';
import { refreshTokenAPI, logoutAPI } from './auth';

const MAX_RETRY_COUNT = 1;
const isClient = typeof window !== 'undefined';

export class HTTPService {
  private apiClient: AxiosInstance;
  private router: any;

  constructor(router?: any) {
    this.apiClient = Axios.create({
      baseURL: process.env.NEXT_PUBLIC_SERVER,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json',
      },
      withCredentials: true,
    });

    this.router = router;
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
            await logoutAPI();
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
                await refreshTokenAPI();
                return this.apiClient(originalRequest);
              } catch (error: any) {
                await logoutAPI();
                this.redirectToLogin();
                return Promise.reject(error);
              }
            } else {
              await logoutAPI();
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

  private redirectToLogin() {
    if (isClient) {
      if (this.router) {
        this.router.push('/login');
      } else {
        window.location.href = '/login';
      }
    }
  }

  public async get<T>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    return await this.apiClient.get<T>(url, config).then((res) => res.data);
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    return await this.apiClient
      .post<T>(url, data, config)
      .then((res) => res.data);
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    return await this.apiClient
      .put<T>(url, data, config)
      .then((res) => res.data);
  }

  public async delete<T>(
    url: string,
    config?: InternalAxiosRequestConfig
  ): Promise<T> {
    return await this.apiClient.delete<T>(url, config).then((res) => res.data);
  }
}
