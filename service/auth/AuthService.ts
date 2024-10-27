import { HTTPService } from '../http-service';

class AuthService extends HTTPService {
  private readonly url = '/api/auth';

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

export default new AuthService();
