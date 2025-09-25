import type { SerializedUser } from '@/entities/user';

export interface Auth {
  user: SerializedUser | null;
  isAuthenticated: boolean;
}
