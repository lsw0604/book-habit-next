'use client';

import { useAppSelector } from '@/store';
import { modalSelector } from '@/store/features/modal/modal-selector';

import RegisterTagModal from './register-tag-modal';
import RegisterMyBookModal from './register-my-book-modal';
import RegisterMyBookCommentModal from './register-my-book-comment';
import DeleteMyBookModal from './delete-my-book-modal';
import DeleteMyBookCommentModal from './delete-my-book-comment-modal';
import UpdateMyBookCommentModal from './update-my-book-comment';

export default function Modal() {
  const { type } = useAppSelector(modalSelector);
  return (
    <>
      {type === 'register-my-book' && <RegisterMyBookModal />}
      {type === 'register-tag' && <RegisterTagModal />}
      {type === 'register-my-book-comment' && <RegisterMyBookCommentModal />}
      {type === 'delete-my-book' && <DeleteMyBookModal />}
      {type === 'delete-my-book-comment' && <DeleteMyBookCommentModal />}
      {type === 'update-my-book-comment' && <UpdateMyBookCommentModal />}
    </>
  );
}
