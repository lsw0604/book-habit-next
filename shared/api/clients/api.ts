import axios from 'axios';
import { axiosConfig } from '../config';
import { createApiWrapper } from '../utils/axios-wrapper';
import {
  setupApiResponseInterceptor,
  setupApiRequestInterceptor,
} from '../interceptors';

export const apiAxiosInstance = axios.create(axiosConfig);

setupApiRequestInterceptor(apiAxiosInstance);
setupApiResponseInterceptor(apiAxiosInstance);

export const apiClient = createApiWrapper(apiAxiosInstance);
