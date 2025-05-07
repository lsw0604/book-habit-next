import axios from 'axios';
import { createApiWrapper } from '../utils/axios-wrapper';
import { axiosConfig } from '../config';

const authAxiosInstance = axios.create(axiosConfig);

export const authClient = createApiWrapper(authAxiosInstance);
