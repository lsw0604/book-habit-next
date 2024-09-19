type ReduxUserType = {
  id: number;
  email?: string;
  name?: string;
  birthday?: string;
  profile?: string;
  isLogged: boolean;
  gender?: GenderType;
  provider?: ProviderType;
};

type GenderType = 'MALE' | 'FEMALE';
type ProviderType = 'LOCAL' | 'KAKAO';
