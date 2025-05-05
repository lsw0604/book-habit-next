import axios from 'axios';
import { axiosConfig } from './config';
import requestInterceptor from './interceptor/request.interceptor';
import responseInterceptor from './interceptor/response.interceptor';

export const apiClient = axios.create(axiosConfig);
export const authClient = axios.create(axiosConfig);

requestInterceptor(apiClient);
responseInterceptor(apiClient);
