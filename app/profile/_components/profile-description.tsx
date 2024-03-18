'use client';

import { useCallback } from 'react';
import { PencilIcon } from 'lucide-react';

import { RootState, useAppDispatch, useAppSelector } from '@/app/store';
import { modalActions } from '@/app/store/modal';

export default function ProfileDescription() {
  const dispatch = useAppDispatch();
  const { name, gender, email, age } = useAppSelector(
    (state: RootState) => state.user
  );

  const modalHandler = useCallback(() => {
    dispatch(modalActions.setModalState({ type: 'modifyProfile' }));
  }, []);

  return (
    <div className="w-full h-auto flex relative justify-center items-center gap-4 flex-col px-0 py-4">
      <p className="text-lg ">
        {name}
        <PencilIcon className="text-xs" onClick={modalHandler} />
      </p>
      <p className="text-xs">{email}</p>
      <p className="text-sm">{age}살</p>
    </div>
  );
}
