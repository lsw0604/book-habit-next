import Axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

type NestServerErrorType = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string;
};

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
    return config;
  },
  (error: AxiosError): Promise<Error> => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError<NestServerErrorType>): Promise<Error> => {
    if (error.response) {
      const { message, path, timestamp, statusCode } = error.response.data;
      return Promise.reject(
        new Error(`[${statusCode}][${timestamp}][${path}] : ${message}`)
      );
    } else if (error.request) {
      return Promise.reject(
        new Error('Network Error: Please check your internet connection.')
      );
    } else {
      return Promise.reject(new Error(`Error: ${error.message}`));
    }
  }
);
