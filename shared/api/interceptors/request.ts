import { AxiosInstance } from 'axios';

import { isClient } from '../constant';

export const setupRequestInterceptor = (client: AxiosInstance) =>
  client.interceptors.request.use(
    config => {
      if (isClient) {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      }

      return config;
    },
    error => Promise.reject(error)
  );
