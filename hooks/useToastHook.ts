import { RootState, useAppDispatch, useAppSelector } from '@/app/store';
import { toastActions } from '@/app/store/toast';
import { useEffect } from 'react';
import { v4 } from 'uuid';

export default function useToastHook() {
  const dispatch = useAppDispatch();
  const { toast } = useAppSelector((state: RootState) => state.toast);

  const addToast = ({ message, status }: Omit<ToastType, 'id'>) => {
    const newToast = { id: v4(), message, status };

    dispatch(toastActions.setAddToast(newToast));
  };

  const deleteToast = ({ id }: Pick<ToastType, 'id'>) => {
    dispatch(toastActions.setRemoveToast(id));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (toast.length > 0) {
        deleteToast({ id: toast[0].id });
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [toast, deleteToast]);

  return {
    toast,
    addToast,
    deleteToast,
  };
}
