import Axios from 'axios';
import { logoutAPI, refreshAPI } from './auth';

export const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
  withCredentials: true,
});

axios.interceptors.request.use(
  async (config) => {
    config.headers.Authorization =
      typeof window !== 'undefined'
        ? `bearer ${window.localStorage.getItem('ACCESS')}`
        : null;
    config.headers.Accept = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const statusCode = error.response?.status;
    const { message, strategy } = error.response?.data;

    if (
      statusCode === 403 &&
      message === 'No auth token' &&
      strategy === 'access'
    ) {
      return Promise.reject(error);
    }

    if (
      statusCode === 403 &&
      message &&
      strategy === 'access' &&
      typeof window !== 'undefined'
    ) {
      const { access_jwt } = await refreshAPI();

      originalRequest._retry = true;
      window.localStorage.setItem('ACCESS', access_jwt);
      return axios(originalRequest);
    }

    if (
      statusCode === 403 &&
      message &&
      strategy === 'refresh' &&
      typeof window !== 'undefined'
    ) {
      await logoutAPI();

      originalRequest._retry = true;
      window.localStorage.removeItem('ACCESS');
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
