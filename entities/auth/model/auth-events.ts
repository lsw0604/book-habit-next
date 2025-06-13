import { User } from '@/entities/user/model/types';
import { EventEmitter } from '@/shared/events';

export type AuthEventData = {
  user?: User;
  error?: Error;
  reason?: string;
};

const authEventEmitter = new EventEmitter<AuthEventData>();

export const AUTH_EVENTS = {
  LOGIN: 'auth:login',
  LOGOUT: 'auth:logout',
  REGISTER: 'auth:register',
  EXPIRED: 'auth:expired',
  ERROR: 'auth:error',
} as const;

export const authEvents = {
  onLogin: (callback: (data: AuthEventData) => void) =>
    authEventEmitter.on(AUTH_EVENTS.LOGIN, callback),
  onLogout: (callback: (data: AuthEventData) => void) =>
    authEventEmitter.on(AUTH_EVENTS.LOGOUT, callback),
  onRegister: (callback: (data: AuthEventData) => void) =>
    authEventEmitter.on(AUTH_EVENTS.REGISTER, callback),
  onExpired: (callback: (data: AuthEventData) => void) =>
    authEventEmitter.on(AUTH_EVENTS.EXPIRED, callback),
  onError: (callback: (data: AuthEventData) => void) =>
    authEventEmitter.on(AUTH_EVENTS.ERROR, callback),
  emitLogin: (user: User) => authEventEmitter.emit(AUTH_EVENTS.LOGIN, { user }),
  emitLogout: () => authEventEmitter.emit(AUTH_EVENTS.LOGOUT, {}),
  emitRegister: (user: User) =>
    authEventEmitter.emit(AUTH_EVENTS.REGISTER, { user }),
  emitExpired: (reason: string) =>
    authEventEmitter.emit(AUTH_EVENTS.EXPIRED, { reason }),
  emitError: (error: Error) =>
    authEventEmitter.emit(AUTH_EVENTS.ERROR, { error }),
};
