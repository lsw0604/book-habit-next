import axios from 'axios';

import { axiosConfig } from '../config';
import { createApiWrapper } from '../utils';

export const apiAxiosInstance = axios.create(axiosConfig);

export const apiClient = createApiWrapper(apiAxiosInstance);
