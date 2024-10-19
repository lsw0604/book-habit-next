'use client';

import { PlusIcon } from 'lucide-react';
import { useCallback } from 'react';
import { useAppDispatch } from '@/store';
import { modalActions } from '@/store/features/modal/modal-action';

export default function MyBookCommentItemAdd() {
  const dispatch = useAppDispatch();

  const openCommentHandler = useCallback(() => {
    dispatch(
      modalActions.setModalState({
        isOpen: true,
        type: 'register-my-book-comment',
      })
    );
  }, []);

  return (
    <li className="w-full h-auto p-0">
      <button
        onClick={openCommentHandler}
        className="flex flex-col gap-2 p-2 border-2 transition-all w-full mb-1 rounded-md"
      >
        <div className="flex w-full h-5 text-center justify-center items-center">
          <span className="text-lg font-bold opacity-50">코멘트 추가하기</span>
        </div>
        <div className="w-full h-10 flex justify-center items-center">
          <PlusIcon className="h-10 w-10 opacity-50" />
        </div>
      </button>
    </li>
  );
}
