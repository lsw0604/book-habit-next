import axios from 'axios';
import { createApiWrapper } from '../utils/axios-wrapper';
import { axiosConfig } from '../config';
import {
  setupApiRequestInterceptor,
  setupApiResponseInterceptor,
} from '../interceptors';

export const authAxiosInstance = axios.create(axiosConfig);

setupApiResponseInterceptor(authAxiosInstance);
setupApiRequestInterceptor(authAxiosInstance);

export const authClient = createApiWrapper(authAxiosInstance);
