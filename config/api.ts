export const API_CONFIG = {
  MAX_RETRY_COUNT: 1,
  BASE_URL: process.env.NEXT_PUBLIC_SERVER,
  AUTH_ENDPOINT: {
    SIGNIN: '/api/auth/signin',
    SIGNUP: '/api/auth/signup',
    REFRESH: '/api/auth/refresh',
    KAKAO: '/api/auth/kakao',
  },
} as const;

export const AXIOS_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_SERVER,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json',
  },
  withCredentials: true,
} as const;
