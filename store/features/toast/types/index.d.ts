type ToastType = {
  id: string;
  message: string;
  status: ToastStatusType;
};

type ToastStatusType = 'SUCCESS' | 'ERROR' | 'WARNING' | 'INFO';

type ReduxToastType = ToastType[];
