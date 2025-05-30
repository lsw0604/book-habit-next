export interface Toast {
  id: string;
  message: string;
  status: ToastStatus;
  position?: ToastPosition;
}

export type ToastStatus = 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO';

export type ToastPosition = 'TOP' | 'BOTTOM';
