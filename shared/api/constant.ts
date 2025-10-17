export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: '/api/auth/signin',
    SIGNUP: '/api/auth/signup',
    REFRESH: '/api/auth/refresh',
    ACCESS: '/api/auth/access',
    KAKAO: '/api/auth/kakao/callback',
    LOGOUT: '/api/auth/logout',
  },
  MY_BOOK: '/api/my-book',
  MY_BOOK_REVIEW: 'api/my-book-review',
  MY_BOOK_HISTORY: 'api/my-book-history',
  MY_BOOK_TAG: 'api/my-book-tag',
  PUBLIC_REVIEW: 'api/public-review',
  SEARCH: 'api/search',
  BOOK: {
    FIND_OR_CREATE: 'api/book/find-or-create',
  },
} as const;

export const MAX_RETRY_COUNT = 1;
export const isClient = typeof window !== 'undefined';
