type EventType = 'SESSION_EXPIRED' | 'USER_LOGGED_IN' | 'USER_LOGGED_OUT';

interface EventData {
  timestamp: number;
  [key: string]: any;
}
