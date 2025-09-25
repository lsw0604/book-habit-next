import { Gender, Provider } from './user.enum';

export interface User {
  id: number;
  email: string;
  name: string;
  birthday: Date | null;
  profile: string;
  gender: Gender;
  provider: Provider;
}

export interface SerializedUser extends Omit<User, 'birthday'> {
  birthday: string | null;
}
