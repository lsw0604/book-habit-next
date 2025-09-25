import type { AxiosResponse } from 'axios';

import type { UserDTO } from '@/entities/user';
import type { ResponseDTO } from '@/shared/api/types/response';

export interface AuthService {
  login: (payload: LoginPayload) => Promise<UserDTO>;
  register: (payload: RegisterPayload) => Promise<UserDTO>;
  kakao: (code: string) => Promise<UserDTO>;
  access: () => Promise<UserDTO>;
  refresh: () => Promise<AxiosResponse<ResponseDTO<UserDTO>>>;
  logout: () => Promise<void>;
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
