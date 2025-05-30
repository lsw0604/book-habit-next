import type { ResponseDto } from '../types/response';
import { AxiosInstance, AxiosRequestConfig } from 'axios';

export const createApiWrapper = (client: AxiosInstance) => {
  return {
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
      const response = await client.get<ResponseDto<T>>(url, config);

      if (!response.data.success) {
        const error = new Error(response.data.message);
        (error as any).statusCode = response.data.statusCode;
        (error as any).error = response.data.error;
        throw error;
      }

      return response.data.data as T;
    },
    post: async <T>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const response = await client.post<ResponseDto<T>>(url, data, config);

      if (!response.data.success) {
        const error = new Error(response.data.message);
        (error as any).statusCode = response.data.statusCode;
        (error as any).error = response.data.error;
        throw error;
      }

      return response.data.data as T;
    },
    patch: async <T>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const response = await client.patch<ResponseDto<T>>(url, data, config);

      if (!response.data.success) {
        const error = new Error(response.data.message);
        (error as any).statusCode = response.data.statusCode;
        (error as any).error = response.data.error;
        throw error;
      }

      return response.data.data as T;
    },
    put: async <T>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      const response = await client.put<ResponseDto<T>>(url, data, config);

      if (!response.data.success) {
        const error = new Error(response.data.message);
        (error as any).statusCode = response.data.statusCode;
        (error as any).error = response.data.error;
        throw error;
      }

      return response.data.data as T;
    },
    delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
      const response = await client.delete<ResponseDto<T>>(url, config);

      if (!response.data.success) {
        const error = new Error(response.data.message);
        (error as any).statusCode = response.data.statusCode;
        (error as any).error = response.data.error;
        throw error;
      }

      return response.data.data as T;
    },
  };
};
