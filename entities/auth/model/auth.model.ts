import type { SerializedUser } from '@/entities/user/model';

export interface Auth {
  user: SerializedUser | null;
  isAuthenticated: boolean;
}
