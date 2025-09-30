import { EventEmitter } from '@/shared/events';

import { Auth } from './auth.model';

export type AuthEventData = {
  auth?: Auth;
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
  emitLogin: (auth: Auth) => authEventEmitter.emit(AUTH_EVENTS.LOGIN, { auth }),
  emitLogout: (auth: Auth) =>
    authEventEmitter.emit(AUTH_EVENTS.LOGOUT, { auth }),
  emitRegister: (auth: Auth) =>
    authEventEmitter.emit(AUTH_EVENTS.REGISTER, { auth }),
  emitExpired: (reason: string) =>
    authEventEmitter.emit(AUTH_EVENTS.EXPIRED, { reason }),
  emitError: (error: Error) =>
    authEventEmitter.emit(AUTH_EVENTS.ERROR, { error }),
};
