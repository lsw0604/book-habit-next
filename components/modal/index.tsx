'use client';

import { useAppSelector } from '@/store';
import { modalSelector } from '@/store/features/modal/modal-selector';

import RegisterTagModal from './register-tag-modal';
import RegisterMyBookModal from './register-my-book-modal';
import RegisterMyBookCommentModal from './register-my-book-comment-modal';
import DeleteMyBookModal from './delete-my-book-modal';
import DeleteMyBookCommentModal from './delete-my-book-comment-modal';
import dynamic from 'next/dynamic';

const RegisterMyBookHistoryModal = dynamic(
  () => import('./register-my-book-history-modal'),
  {
    ssr: false,
  }
);

export default function Modal() {
  const { type } = useAppSelector(modalSelector);
  return (
    <>
      {type === 'register-my-book' && <RegisterMyBookModal />}
      {type === 'register-tag' && <RegisterTagModal />}
      {type === 'register-my-book-comment' && <RegisterMyBookCommentModal />}
      {type === 'register-my-book-history' && <RegisterMyBookHistoryModal />}
      {type === 'delete-my-book' && <DeleteMyBookModal />}
      {type === 'delete-my-book-comment' && <DeleteMyBookCommentModal />}
    </>
  );
}
