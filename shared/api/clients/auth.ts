import axios from 'axios';

import { axiosConfig } from '../config';
import { setupRequestInterceptor } from '../interceptors';
import { setupAuthResponseInterceptor } from '../interceptors/auth.response';
import { createApiWrapper } from '../utils/axios-wrapper';

export const authAxiosInstance = axios.create(axiosConfig);

setupAuthResponseInterceptor(authAxiosInstance);
setupRequestInterceptor(authAxiosInstance);

export const authClient = createApiWrapper(authAxiosInstance);
