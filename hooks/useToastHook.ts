import { useEffect, useCallback } from 'react';
import { v4 } from 'uuid';

import { RootState, useAppDispatch, useAppSelector } from 'store';
import { toastActions } from 'store/toast';

export default function useToastHook() {
  const dispatch = useAppDispatch();
  const toast = useAppSelector((state: RootState) => state.toast);

  const addToast = useCallback(
    ({ message, status }: Omit<ToastType, 'id'>) => {
      const newToast = { id: v4(), message, status };

      dispatch(toastActions.setAddToast(newToast));
    },
    [dispatch]
  );

  const deleteToast = useCallback(
    ({ id }: Pick<ToastType, 'id'>) => {
      dispatch(toastActions.setRemoveToast(id));
    },
    [dispatch]
  );

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
