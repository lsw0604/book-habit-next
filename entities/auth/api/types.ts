import { Gender, Provider } from '@/entities/user/model/types';
import { ResponseDto } from '@/shared/api/types/response';
import { AxiosResponse } from 'axios';

export interface AuthService {
  login: (payload: LoginPayload) => Promise<ResponseAuth>;
  register: (payload: RegisterPayload) => Promise<ResponseAuth>;
  kakao: (code: string) => Promise<ResponseAuth>;
  logout: () => Promise<void>;
  refresh: () => Promise<AxiosResponse<ResponseDto<ResponseAuth>>>;
  access: () => Promise<ResponseAuth>;
}

interface UserPayload {
  email: string;
  password: string;
}

export interface LoginPayload extends UserPayload {}

export interface RegisterPayload extends UserPayload {
  gender: Gender;
  password: string;
  birthday?: Date;
}

export interface ResponseAuth {
  id: number;
  email: string;
  name: string;
  birthday?: string;
  gender: Gender;
  provider: Provider;
}
