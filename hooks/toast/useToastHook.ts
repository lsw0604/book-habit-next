import { useEffect, useCallback } from 'react';
import { v4 } from 'uuid';

import { useAppDispatch, useAppSelector } from '@/store';
import { toastActions } from '@/store/features/toast/toast-action';
import { toastSelector } from '@/store/features/toast/toast-selector';

export default function useToastHook() {
  const dispatch = useAppDispatch();
  const toast = useAppSelector(toastSelector);

  const addToast = useCallback(
    (payload: Omit<ToastType, 'id'>) => {
      const newToast = { id: v4(), ...payload };

      dispatch(toastActions.addToast(newToast));
    },
    [dispatch]
  );

  const removeToast = useCallback(
    (payload: Pick<ToastType, 'id'>) => {
      dispatch(toastActions.removeToast({ ...payload }));
    },
    [dispatch]
  );

  useEffect(() => {
    const interval = setTimeout(() => {
      if (toast.length > 0) {
        removeToast({ id: toast[0].id });
      }
    }, 1500);
    return () => clearTimeout(interval);
  }, [toast, removeToast]);

  return {
    toast,
    addToast,
    removeToast,
  };
}
