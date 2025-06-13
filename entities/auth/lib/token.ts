type Token = string | null;

interface TokenService {
  getToken: () => Token;
  setToken: (token: string) => void;
  removeToken: () => void;
}

export const tokenService: TokenService = {
  getToken: () => {
    try {
      if (typeof window === 'undefined') {
        console.warn('getToken was called during SSR');
        return null;
      }
      return sessionStorage.getItem('accessToken');
    } catch (error) {
      console.error('failed to get token : ', error);
      return null;
    }
  },
  setToken: (token: string) => {
    try {
      if (typeof window === 'undefined') {
        console.warn('getToken was called during SSR');
        return;
      }
      sessionStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('failed to set token : ', error);
    }
  },
  removeToken: () => {
    try {
      if (typeof window === 'undefined') {
        console.warn('removeToken was called during SSR');
        return;
      }
      sessionStorage.removeItem('accessToken');
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  },
};
