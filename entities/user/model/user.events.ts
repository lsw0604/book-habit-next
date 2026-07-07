import { EventEmitter } from "@/shared/events";
import { User } from "./user.model";

export type UserEventData = {
  user?: User;
  error?: Error;
  reason?: string;
}

const userEventEmitter = new EventEmitter<UserEventData>();

export const USER_EVENTS = {
  LOGIN: 'user:login',
  LOGOUT: 'user:logout',
  REGISTER: 'user:register',
  EXPIRED: 'user:expired',
  ERROR: 'user:error'
} as const;

export const userEvents = {
  onLogin: (callback: (data: UserEventData) => void) => userEventEmitter.on(USER_EVENTS.LOGIN, callback),
  onLogout: (callback: (data: UserEventData) => void) => userEventEmitter.on(USER_EVENTS.LOGOUT, callback),
  onRegister: (callback: (data: UserEventData) => void) => userEventEmitter.on(USER_EVENTS.REGISTER, callback),
  onExpired: (callback: (data: UserEventData) => void) => userEventEmitter.on(USER_EVENTS.EXPIRED, callback),
  onError: (callback: (data: UserEventData) => void) => userEventEmitter.on(USER_EVENTS.ERROR, callback),
  emitLogin: (user: User) => userEventEmitter.emit(USER_EVENTS.LOGIN, { user }),
  emitLogout: (user: User) => userEventEmitter.emit(USER_EVENTS.LOGOUT, { user }),
  emitRegister: (user: User) => userEventEmitter.emit(USER_EVENTS.REGISTER, { user }),
  emitExpired: (reason: string) => userEventEmitter.emit(USER_EVENTS.EXPIRED, { reason }),
  emitError: (error: Error) => userEventEmitter.emit(USER_EVENTS.ERROR, { error })
}