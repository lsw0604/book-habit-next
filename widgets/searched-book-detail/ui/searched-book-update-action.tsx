import { MyBookDetail, MyBookStatus } from '@/entities/my-book';
import { useUpdateMyBook }  from '@/features/update-my-book';
import { Rating } from '@/shared/ui/rating';
import { BookmarkPlus, BookOpen } from 'lucide-react';

interface SearchedBookUpdateActionProps {
  data: MyBookDetail;
}

export function SearchedBookUpdateAction({ data }: SearchedBookUpdateActionProps) {
  const { id, status, rating: currentRating } = data;
  const { mutateAsync } = useUpdateMyBook();

  const onClickReading = () => {
    if (status !== MyBookStatus.CURRENTLY_READING) {
      mutateAsync({ id, status: MyBookStatus.CURRENTLY_READING, rating: 0 });
    }
  }

  const onClickWantToRead = () => {
    if (status !== MyBookStatus.WANT_TO_READ) {
      mutateAsync({ id, status: MyBookStatus.WANT_TO_READ, rating: 0 });
    }
  }

  /**
   * TODO: 한줄평 추가하는 모달을 만들기
   */
  const onClickModal = () => {
    console.log('modal')
  }

  const onChangeRating = (rating: number) => {
    mutateAsync({ id, status: MyBookStatus.READ,rating });
  }

  const isWantToRead = status === MyBookStatus.WANT_TO_READ;
  const isReading = status === MyBookStatus.CURRENTLY_READING;

  return (
    <div className="flex flex-col gap-3 w-full bg-white p-1 rounded-xl">
      <div className="grid grid-cols-3 gap-2.5">
        <button
          type="button"
          onClick={onClickWantToRead}
          className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all active:scale-[0.97] ${
            isWantToRead 
              ? 'bg-blue-50 border-blue-500 text-blue-600 font-bold' 
              : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
          }`}
        >
          <BookmarkPlus size={22} className="mb-1.5" />
          <span className="text-xs">보고 싶어요</span>
        </button>
        <button
          type="button"
          onClick={onClickReading}
          className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all active:scale-[0.97] ${
            isReading 
              ? 'bg-emerald-50 border-emerald-500 text-emerald-600 font-bold' 
              : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
          }`}
        >
          <BookOpen size={22} className="mb-1.5" />
          <span className="text-xs">독서 중</span>
        </button>
        <button
          type="button"
          onClick={onClickModal}
          className="flex flex-col items-center justify-center py-3 rounded-xl border transition-all active:scale-[0.97] bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
        >
          <BookOpen size={22} className="mb-1.5" />
          <span className="text-xs font-bold">독서 중</span>
        </button>
      </div>
      <div className="w-full p-4 rounded-xl border transition-all">
        <div className="flex justify-center">
          <Rating rating={currentRating} onChange={onChangeRating} />
        </div>
      </div>
    </div>
  )
}