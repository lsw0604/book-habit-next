import {
  MyBookReadButton,
  MyBookReadingButton,
  MyBookWantToReadButton,
} from '@/entities/my-book';

import { useAddMyBookAction } from '../hooks';

interface AddMyBookActionProps {
  isbn: string;
}

export function AddMyBookAction({ isbn }: AddMyBookActionProps) {
  const { handleReadClick, handleReadingClick, handleWantToReadClick } =
    useAddMyBookAction({ isbn });

  return (
    <div className="flex flex-col gap-2 w-full bg-white p-1 rounded-xl">
      <p className="px-1 text-xs font-medium text-gray-500">내 서재에 담기</p>
      <div className="grid grid-cols-3 gap-2.5">
        <MyBookWantToReadButton onClick={handleWantToReadClick} />
        <MyBookReadingButton onClick={handleReadingClick} />
        <MyBookReadButton onClick={handleReadClick} />
      </div>
    </div>
  );
}
