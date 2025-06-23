import { User } from '@/entities/user/model';

export interface Auth {
  user: User | null;
  isAuthenticated: boolean;
}
