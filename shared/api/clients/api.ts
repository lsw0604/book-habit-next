import axios from 'axios';
import { axiosConfig } from '../config';
import { createApiWrapper } from '../utils/axios-wrapper';
import {
  setupResponseInterceptor,
  setupRequestInterceptor,
} from '../interceptors';

const apiAxiosInstance = axios.create(axiosConfig);

setupRequestInterceptor(apiAxiosInstance);
setupResponseInterceptor(apiAxiosInstance);

export const apiClient = createApiWrapper(apiAxiosInstance);
