import { AxiosError, AxiosInstance } from 'axios';

import { ErrorDTO } from '../dto';

export const setupAuthResponseInterceptor = (instance: AxiosInstance) =>
  instance.interceptors.response.use(
    response => response,
    async (error: AxiosError<ErrorDTO>) => Promise.reject(error)
  );
