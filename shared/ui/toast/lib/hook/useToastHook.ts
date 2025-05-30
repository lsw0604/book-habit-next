import { v4 } from 'uuid';
import { useEffect, useCallback, useRef } from 'react';
import { Toast, ToastPosition } from '../../model/types';
import { toastSelector, createToast, deleteToast } from '../../model/store';
import { useAppDispatch, useAppSelector } from '@/shared/redux/store';
import { TOAST_DURATION, MAX_TOAST_COUNT } from '../constant';

interface ToastProps {
  message: string;
  duration: number;
  position?: ToastPosition;
}

export function useToastHook() {
  const dispatch = useAppDispatch();
  const { toasts } = useAppSelector(toastSelector);
  const toastTimers = useRef<Record<string, NodeJS.Timeout>>({});

  // 토스트 추가 함수
  const addToast = useCallback(
    (payload: Omit<Toast, 'id'>, duration: number = TOAST_DURATION) => {
      const { position = 'TOP' } = payload;
      const positionToasts = position === 'TOP' ? toasts.top : toasts.bottom;

      // 최대 토스트 개수 제한
      if (positionToasts.length >= MAX_TOAST_COUNT) {
        const oldestToastId = positionToasts[0].id;
        dispatch(deleteToast({ id: oldestToastId }));

        // 타이머 정리
        if (toastTimers.current[oldestToastId]) {
          clearTimeout(toastTimers.current[oldestToastId]);
          delete toastTimers.current[oldestToastId];
        }
      }

      const id = v4();
      const newToast = { id, ...payload };

      dispatch(createToast(newToast));

      // 각 토스트별 타이머 설정
      if (duration > 0) {
        toastTimers.current[id] = setTimeout(() => {
          removeToast({ id });
        }, duration);
      }

      return id;
    },
    [dispatch, toasts]
  );

  // 토스트 제거 함수
  const removeToast = useCallback(
    ({ id }: Pick<Toast, 'id'>) => {
      dispatch(deleteToast({ id }));

      // 타이머 정리
      if (toastTimers.current[id]) {
        clearTimeout(toastTimers.current[id]);
        delete toastTimers.current[id];
      }
    },
    [dispatch]
  );

  // 컴포넌트 언마운트 시 모든 타이머 정리
  useEffect(() => {
    return () => {
      Object.values(toastTimers.current).forEach(clearTimeout);
      toastTimers.current = {};
    };
  }, []);

  // 편의 메서드들
  const successToast = useCallback(
    (payload: ToastProps) =>
      addToast(
        {
          message: payload.message,
          status: 'SUCCESS',
          position: payload.position,
        },
        payload.duration
      ),
    [addToast]
  );

  const warningToast = useCallback(
    (payload: ToastProps) =>
      addToast(
        {
          message: payload.message,
          status: 'WARNING',
          position: payload.position,
        },
        payload.duration
      ),
    [addToast]
  );

  const infoToast = useCallback(
    (payload: ToastProps) =>
      addToast(
        {
          message: payload.message,
          status: 'INFO',
          position: payload.position,
        },
        payload.duration
      ),
    [addToast]
  );

  const errorToast = useCallback(
    (payload: ToastProps) =>
      addToast(
        {
          message: payload.message,
          status: 'ERROR',
          position: payload.position,
        },
        payload.duration
      ),
    [addToast]
  );

  const promiseToast = useCallback(
    <T>(
      promise: Promise<T>,
      {
        loading = '처리 중입니다...',
        success = '성공적으로 처리되었습니다.',
        error = '오류가 발생했습니다.',
      }: {
        loading?: string;
        success?: string | ((result: T) => string);
        error?: string | ((err: any) => string);
      },
      position: ToastPosition = 'TOP'
    ): Promise<T> => {
      const toastId = addToast(
        {
          message: loading,
          status: 'INFO',
          position,
        },
        0
      ); // 수동 제거를 위해 자동 타이머 비활성화

      return promise
        .then(result => {
          removeToast({ id: toastId });

          const successMessage =
            typeof success === 'function' ? success(result) : success;

          successToast({ message: successMessage, position, duration: 0 });
          return result;
        })
        .catch(err => {
          removeToast({ id: toastId });

          const errorMessage = typeof error === 'function' ? error(err) : error;

          errorToast({ message: errorMessage, position, duration: 0 });
          throw err;
        });
    },
    [addToast, removeToast, successToast, errorToast]
  );

  return {
    toasts,
    addToast,
    successToast,
    warningToast,
    infoToast,
    errorToast,
    removeToast,
    promiseToast,
  };
}
