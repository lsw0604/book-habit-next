import axios from 'axios';
import { axiosConfig } from './config';
import {
  createRequestInterceptor,
  createResponseInterceptor,
} from './interceptors';

export const createClient = () => {
  const client = axios.create(axiosConfig);

  createRequestInterceptor(client);
  createResponseInterceptor(client);

  return {
    get: async <T>(url: string, config = {}): Promise<T> => {
      const response = await client.get<T>(url, config);
      return response.data;
    },
    post: async <T>(url: string, data?: unknown, config = {}): Promise<T> => {
      const response = await client.post<T>(url, data, config);
      return response.data;
    },
    put: async <T>(url: string, data?: unknown, config = {}): Promise<T> => {
      const response = await client.put<T>(url, data, config);
      return response.data;
    },
    delete: async <T>(url: string, config = {}): Promise<T> => {
      const response = await client.delete<T>(url, config);
      return response.data;
    },
  };
};
