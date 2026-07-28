import type { AxiosRequestConfig } from 'axios';

export const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_SERVER,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
  withCredentials: true,
};
