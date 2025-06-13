import { User } from '@/entities/user/model/types';

export interface Auth {
  user: User | null;
  isAuthenticated: boolean;
}
