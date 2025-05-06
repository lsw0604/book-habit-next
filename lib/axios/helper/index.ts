import { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { ResponseDto } from '../interface';

export const createApiWrapper = (client: AxiosInstance) => {
  return {
    get: async <T>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<ResponseDto<T>> => {
      const response = await client.get<ResponseDto<T>>(url, config);
      return response.data;
    },
    post: async <T>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<ResponseDto<T>> => {
      const response = await client.post<ResponseDto<T>>(url, data, config);
      return response.data;
    },
    patch: async <T>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<ResponseDto<T>> => {
      const response = await client.patch<ResponseDto<T>>(url, data, config);
      return response.data;
    },
    put: async <T>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<ResponseDto<T>> => {
      const response = await client.put<ResponseDto<T>>(url, data, config);
      return response.data;
    },
    delete: async <T>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<ResponseDto<T>> => {
      const response = await client.delete<ResponseDto<T>>(url, config);
      return response.data;
    },
  };
};
