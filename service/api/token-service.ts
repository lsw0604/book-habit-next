import { NextRouter } from 'next/router';

export interface TokenPayload {
  accessToken: string;
}

export class TokenService {
  private static instance: TokenService;
  private router: NextRouter | null = null;

  public static getInstance(): TokenService {
    if (!TokenService.instance) {
      TokenService.instance = new TokenService();
    }
    return TokenService.instance;
  }

  private constructor() {}

  public setRouter(router: NextRouter): void {
    this.router = router;
  }

  /**
   * @description accessToken을 저장합니다.
   */
  public setToken({ accessToken }: TokenPayload) {
    if (typeof window === 'undefined') return;

    if (accessToken) {
      sessionStorage.setItem('accessToken', accessToken);
    }
  }

  /**
   * @description accessToken을 반환합니다.
   */
  public getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;

    return sessionStorage.getItem('accessToken');
  }
}
