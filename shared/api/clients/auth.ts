import axios from 'axios';
import { createApiWrapper } from '../utils/axios-wrapper';
import { axiosConfig } from '../config';
import { setupRequestInterceptor } from '../interceptors';
import { setupAuthResponseInterceptor } from '../interceptors/auth.response';

export const authAxiosInstance = axios.create(axiosConfig);

setupAuthResponseInterceptor(authAxiosInstance);
setupRequestInterceptor(authAxiosInstance);

export const authClient = createApiWrapper(authAxiosInstance);
