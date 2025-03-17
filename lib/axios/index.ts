import axios from 'axios';
import { axiosConfig } from './config';
import {
  createRequestInterceptor,
  createResponseInterceptor,
} from './interceptors';

export const axiosInstance = axios.create(axiosConfig);

createResponseInterceptor(axiosInstance);
createRequestInterceptor(axiosInstance);
