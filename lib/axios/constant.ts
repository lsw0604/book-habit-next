export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: '/api/auth/signin',
    SIGNUP: '/api/auth/signup',
    REFRESH: '/api/auth/refresh',
    KAKAO: '/api/auth/kakao',
    LOGOUT: '/api/auth/logout',
  },
  MY_BOOK: '/api/my-book',
} as const;

export const MAX_RETRY_COUNT = 1;
export const isClient = typeof window !== 'undefined';
