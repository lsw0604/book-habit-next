export interface AuthService {
  login: (payload: RequestLogin) => Promise<ResponseAuth>;
  register: (payload: RequestRegister) => Promise<ResponseAuth>;
  kakao: (payload: RequestKakao) => Promise<ResponseAuth>;
  logout: () => Promise<void>;
  refresh: () => Promise<ResponseAuth>;
}

export interface RequestLogin {
  email: string;
  password: string;
}

export interface RequestRegister {
  email: string;
  name: string;
  gender: GenderType;
  password: string;
  birthday: Date;
}

export interface RequestKakao {
  code: string;
}

export interface ResponseAuth {
  id: number;
  email: string;
  name: string;
  birthday: string;
  gender: GenderType;
  provider: ProviderType;
}
