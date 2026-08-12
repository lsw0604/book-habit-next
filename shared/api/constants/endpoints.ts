export const API_ENDPOINTS = {
  AUTH: {
    SIGNIN: '/api/auth/signin',
    SIGNUP: '/api/auth/signup',
    REFRESH: '/api/auth/refresh',
    ACCESS: '/api/auth/access',
    KAKAO: '/api/auth/kakao/callback',
    LOGOUT: '/api/auth/logout',
  },
  MY_BOOK: {
    DEFAULT: '/api/my-book',
    FINISHED: '/api/my-book/finished',
    READING: '/api/my-book/reading',
    WANT_TO_READ: '/api/my-book/want-to-read',
    WITH_REVIEW: '/api/my-book/with-review',
  },
  MY_BOOK_REVIEW: 'api/my-book-review',
  MY_BOOK_HISTORY: 'api/my-book-history',
  MY_BOOK_TAG: 'api/my-book-tag',
  PUBLIC_REVIEW: 'api/public-review',
  SEARCH: {
    KAKAO: 'api/search',
    ALADIN: 'api/search/detail',
  },
  BOOK: {
    DEFAULT: 'api/book',
    FIND_OR_CREATE: 'api/book/find-or-create',
  },
} as const;
