import type { SerializedUser, User } from '@/entities/user';

export interface Auth {
  user: User | null;
  isAuthenticated: boolean;
}

export interface SerializedAuth extends Omit<Auth, 'user'> {
  user: SerializedUser | null;
}
