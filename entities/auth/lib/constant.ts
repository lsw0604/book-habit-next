export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize`;
export const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_REST_API || '';
export const KAKAO_REDIRECT_URI =
  process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI || '';
export const DEFAULT_AUTHENTICATED_ROUTE = '/search';
export const DEFAULT_UNAUTHENTICATED_ROUTE = '/login';
export const AUTH_ROUTES = ['/login', '/register'];
