import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { axiosConfig } from './config';
import {
  createRequestInterceptor,
  createResponseInterceptor,
} from './interceptors';

export const createClient = () => {
  const client = axios.create(axiosConfig);

  createRequestInterceptor(client);
  createResponseInterceptor(client);

  const responseHandler = <T>(response: AxiosResponse<T>) => response.data;

  return {
    get: async <T, D = unknown>(
      url: string,
      config: AxiosRequestConfig<D> = {}
    ): Promise<T> => {
      const response = await client.get<T>(url, config);
      return responseHandler(response);
    },
    post: async <T, D = unknown>(
      url: string,
      config: AxiosRequestConfig<D> = {},
      data?: D
    ): Promise<T> => {
      const response = await client.post<T>(url, data, config);
      return responseHandler(response);
    },
    put: async <T, D = unknown>(
      url: string,
      config: AxiosRequestConfig<D> = {},
      data?: D
    ): Promise<T> => {
      const response = await client.put<T>(url, data, config);
      return responseHandler(response);
    },
    patch: async <T, D = unknown>(
      url: string,
      config: AxiosRequestConfig<D> = {},
      data?: D
    ): Promise<T> => {
      const response = await client.patch<T>(url, data, config);
      return responseHandler(response);
    },
    delete: async <T, D = unknown>(
      url: string,
      config: AxiosRequestConfig<D> = {}
    ): Promise<T> => {
      const response = await client.delete<T>(url, config);
      return responseHandler(response);
    },
  };
};
