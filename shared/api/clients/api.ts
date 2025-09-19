import axios from 'axios';

import { authService } from '@/entities/auth/api';

import { axiosConfig } from '../config';
import { setupApiResponseInterceptor } from '../interceptors/api.response';
import { setupRequestInterceptor } from '../interceptors/request';
import { createApiWrapper } from '../utils/axios-wrapper';

export const apiAxiosInstance = axios.create(axiosConfig);

setupRequestInterceptor(apiAxiosInstance);
setupApiResponseInterceptor(apiAxiosInstance, () => authService.refresh());

export const apiClient = createApiWrapper(apiAxiosInstance);
