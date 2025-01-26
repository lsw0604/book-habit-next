import { eventEmitter } from './emitter';

export const authEvents = {
  emitSessionExpired: (data?: Partial<EventData>) => {
    eventEmitter.emit('SESSION_EXPIRED', {
      timestamp: Date.now(),
      ...data,
    });
  },
  onSessionExpired: (handler: (data: EventData) => void) => {
    return eventEmitter.on('SESSION_EXPIRED', handler);
  },
};
