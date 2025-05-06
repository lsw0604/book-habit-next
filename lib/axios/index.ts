import axios from 'axios';
import {
  setupRequestInterceptor,
  setupResponseInterceptor,
} from './interceptor';
import { axiosConfig } from './config';
import { createApiWrapper } from './helper';

// Axios 인스턴스 생성
export const apiAxiosInstance = axios.create(axiosConfig);
export const authAxiosInstance = axios.create(axiosConfig);

// 인터셉터 설정
setupRequestInterceptor(apiAxiosInstance);
setupResponseInterceptor(apiAxiosInstance);

// 사용하기 쉬운 래핑된 클라이언트 생성
export const apiClient = createApiWrapper(apiAxiosInstance);
export const authClient = createApiWrapper(authAxiosInstance);
