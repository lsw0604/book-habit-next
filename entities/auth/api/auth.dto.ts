import { UserDTO } from '@/entities/user';

export interface AuthDTO {
  user: UserDTO | null;
  accessToken?: string;
  isAuthenticated: boolean;
}
