import { useAppDispatch } from '@/shared/redux';

import { closeModal, ModalPropsMap, ModalType, openModal } from '../model';

export const useModal = () => {
  const dispatch = useAppDispatch();
  // 제네릭 함수로 래핑
  const open = <T extends ModalType>(type: T, props: ModalPropsMap[T]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(openModal({ type, props } as any));
  };

  const close = () => {
    dispatch(closeModal());
  };

  return { open, close };
};
