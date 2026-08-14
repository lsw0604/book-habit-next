import type { AxiosRequestConfig } from 'axios';

/**
 * 응답이 오지 않는 서버에 무한정 매달리지 않기 위한 상한.
 * 서버 컴포넌트의 prefetch도 이 인스턴스를 쓰므로, 값이 없으면 SSR 렌더가 그만큼 지연된다.
 */
const REQUEST_TIMEOUT_MS = 10_000;

export const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_SERVER,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
  withCredentials: true,
};
