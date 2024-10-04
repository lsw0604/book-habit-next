'use client';

import { useAppSelector } from '@/store';
import { modalSelector } from '@/store/features/modal/modal-selector';

import RegisterMyBookModal from './register-my-book';
import DeleteMyBookModal from './delete-my-book';

export default function Modal() {
  const { type } = useAppSelector(modalSelector);
  return (
    <>
      {type === 'register-my-book' && <RegisterMyBookModal />}
      {type === 'delete-my-book' && <DeleteMyBookModal />}
    </>
  );
}
