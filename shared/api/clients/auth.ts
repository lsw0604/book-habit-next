import axios from 'axios';

import { axiosConfig } from '../config';
import { createApiWrapper } from '../utils';

export const authAxiosInstance = axios.create(axiosConfig);

export const authClient = createApiWrapper(authAxiosInstance);
