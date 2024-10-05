'use client';

import { useAppSelector } from '@/store';
import { modalSelector } from '@/store/features/modal/modal-selector';

import RegisterTagModal from './register-tag-modal';
import RegisterMyBookModal from './register-my-book-modal';
import DeleteMyBookModal from './delete-my-book-modal';

export default function Modal() {
  const { type } = useAppSelector(modalSelector);
  return (
    <>
      {type === 'register-my-book' && <RegisterMyBookModal />}
      {type === 'delete-my-book' && <DeleteMyBookModal />}
      {type === 'register-tag' && <RegisterTagModal />}
    </>
  );
}
