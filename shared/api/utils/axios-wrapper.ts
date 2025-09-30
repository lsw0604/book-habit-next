import {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  isAxiosError,
} from 'axios';

import type { ResponseDTO, ErrorDTO } from '../dto';
import { APIError } from '../errors';

async function handleRequest<T>(
  request: Promise<AxiosResponse<ResponseDTO<T>>>
): Promise<T> {
  try {
    const response = await request;

    return response.data.data;
  } catch (err) {
    if (isAxiosError<ErrorDTO>(err) && err.response) {
      throw new APIError(err.response.data);
    }
    throw err;
  }
}

export const createApiWrapper = (client: AxiosInstance) => ({
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    handleRequest(client.get<ResponseDTO<T>>(url, config)),
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    handleRequest(client.delete<ResponseDTO<T>>(url, config)),
  post: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> =>
    handleRequest(client.post<ResponseDTO<T>>(url, data, config)),
  patch: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> =>
    handleRequest(client.patch<ResponseDTO<T>>(url, data, config)),
  put: async <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> => handleRequest(client.put<ResponseDTO<T>>(url, data, config)),
});
