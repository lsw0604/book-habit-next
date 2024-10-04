'use client';

import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store';
import { setModalState } from '@/store/features/modal/modal-slice';

export default function MyBookBottom() {
  const dispatch = useAppDispatch();

  const onClickDelete = () => {
    dispatch(setModalState({ isOpen: true, type: 'delete-my-book' }));
  };

  return (
    <div className="w-full px-2">
      <div className="w-full h-auto border border-gray-300 rounded-lg shadow-lg bg-transparent p-2">
        <Button
          variant="rose"
          type="button"
          onClick={onClickDelete}
          className="w-full text-sm text-foreground bg-rose-400"
        >
          삭제하기
        </Button>
      </div>
    </div>
  );
}
