'use client';

import { useAppSelector } from '@/shared/redux/store';
import { modalSelector } from '@/entities/modal/model/store';
import RegisterMyBookModal from '@/features/add-my-book/ui';

export default function ModalManager() {
  const { type } = useAppSelector(modalSelector);
  return <>{type === 'REGISTER_MY_BOOK' && <RegisterMyBookModal />}</>;
}
