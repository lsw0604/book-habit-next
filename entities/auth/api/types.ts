import type { AuthDTO } from './auth.dto';

export interface AuthService {
  login: (payload: LoginPayload) => Promise<AuthDTO>;
  register: (payload: RegisterPayload) => Promise<AuthDTO>;
  kakao: (code: string) => Promise<AuthDTO>;
  access: () => Promise<AuthDTO>;
  refresh: () => Promise<AuthDTO>;
  logout: () => Promise<AuthDTO>;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  name: string;
  gender: string;
  birthday: Date;
}
