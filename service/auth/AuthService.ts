import { HTTPService } from '../http-service';

class AuthService extends HTTPService {
  private readonly url = '/api/auth';
  private static instance: AuthService;

  private constructor(router?: any) {
    super(router);
  }

  public static getInstance(router?: any) {
    if (AuthService.instance) {
      AuthService.instance = new AuthService(router);
    } else if (router) {
      AuthService.instance = new AuthService(router);
    }

    return AuthService.instance;
  }

  login(payload: RequestLogin) {
    return this.post<ResponseAuth>(
      `${this.url}/signin`,
      JSON.stringify(payload)
    );
  }

  register(payload: RequestRegister) {
    return this.post<ResponseAuth>(
      `${this.url}/signup`,
      JSON.stringify(payload)
    );
  }

  kakao(code: string) {
    return this.get<ResponseAuth>(
      `${this.url}/kakao/callback?code=${encodeURIComponent(code)}`
    );
  }

  logout() {
    return this.get<ResponseLogout>(`${this.url}/logout`);
  }

  refresh() {
    return this.get<ResponseAuth>(`${this.url}/refresh`);
  }
}

export const authService = AuthService.getInstance();
export const useAuthService = (router?: any) => AuthService.getInstance(router);
