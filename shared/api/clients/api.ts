import axios from 'axios';
import { axiosConfig } from '../config';
import { createApiWrapper } from '../utils/axios-wrapper';
import { setupRequestInterceptor } from '../interceptors/request';
import { setupApiResponseInterceptor } from '../interceptors/api.response';
import { authService } from '@/entities/auth/api';

export const apiAxiosInstance = axios.create(axiosConfig);

setupRequestInterceptor(apiAxiosInstance);
setupApiResponseInterceptor(apiAxiosInstance, () => authService.refresh());

export const apiClient = createApiWrapper(apiAxiosInstance);
