import type { AxiosRequestConfig } from 'axios';

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  retry?: boolean;
  retryCount?: number;
}
