import axios from 'axios';

import { axiosConfig } from './config';
import { createApiWrapper } from './wrapper';

export const apiAxiosInstance = axios.create(axiosConfig);
export const apiClient = createApiWrapper(apiAxiosInstance);

export const authAxiosInstance = axios.create(axiosConfig);
export const authClient = createApiWrapper(authAxiosInstance);
