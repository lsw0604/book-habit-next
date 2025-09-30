import { AxiosError, AxiosInstance } from 'axios';

import { ErrorResponseDTO } from '../types/error';
import { extractAndSaveToken } from '../utils/extract-and-save-token';

export const setupAuthResponseInterceptor = (instance: AxiosInstance) =>
  instance.interceptors.response.use(
    response => {
      extractAndSaveToken(response);

      return response;
    },
    async (error: AxiosError<ErrorDTO>) => Promise.reject(error)
  );
