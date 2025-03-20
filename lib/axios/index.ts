import axios from 'axios';
import { axiosConfig } from './config';
import {
  createRequestInterceptor,
  createResponseInterceptor,
} from './interceptors';

const axiosInstance = axios.create(axiosConfig);

createResponseInterceptor(axiosInstance);
createRequestInterceptor(axiosInstance);

export default axiosInstance;
