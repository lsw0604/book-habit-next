import { Trash2 } from 'lucide-react';

import {
  MyBookReadButton,
  MyBookReadingButton,
  MyBookWantToReadButton,
  type MyBookDetail,
} from '@/entities/my-book';
import { Rating } from '@/shared/ui/rating';

import { useUpdateMyBookAction } from '../hooks';

interface UpdateMyBookActionProps {
  data: MyBookDetail;
}

export function UpdateMyBookAction({ data }: UpdateMyBookActionProps) {
  const {
    isWantToRead,
    isReading,
    isRead,
    rating,
    handleWantToReadClick,
    handleReadingClick,
    handleReadClick,
    handleChangeRating,
    handleRemoveClick,
  } = useUpdateMyBookAction({ data });

  return (
    <div className="flex flex-col gap-3 w-full bg-white p-1 rounded-xl">
      <div className="grid grid-cols-3 gap-2.5">
        <MyBookWantToReadButton
          onClick={handleWantToReadClick}
          isActive={isWantToRead}
        />
        <MyBookReadingButton onClick={handleReadingClick} isActive={isReading} />
        <MyBookReadButton onClick={handleReadClick} isActive={isRead} />
      </div>
      {isRead && (
        <div className="w-full p-4 rounded-xl border transition-all">
          <p className="mb-2 text-xs font-medium text-gray-500">내 평점</p>
          <div className="flex justify-center">
            <Rating rating={rating} onChange={handleChangeRating} />
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={handleRemoveClick}
        className="flex items-center justify-center gap-1.5 py-2 text-xs font-medium text-gray-400 transition-colors hover:text-gray-600"
      >
        <Trash2 size={14} />
        서재에서 빼기
      </button>
    </div>
  );
}
