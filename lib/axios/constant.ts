export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: '/api/auth/signin',
    SIGNUP: '/api/auth/signup',
    REFRESH: '/api/auth/refresh',
    KAKAO: '/api/auth/kakao',
    LOGOUT: '/api/auth/logout',
  },
  MY_BOOK: '/api/my-book',
  MY_BOOK_COMMENT: 'api/my-book-comment',
  MY_BOOK_HISTORY: 'api/my-book-history',
  MY_BOOK_TAG: 'api/my-book-tag',
  PUBLIC_COMMENT: 'api/public-comment',
} as const;

export const MAX_RETRY_COUNT = 1;
export const isClient = typeof window !== 'undefined';
