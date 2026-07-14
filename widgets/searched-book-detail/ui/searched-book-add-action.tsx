import { useAddFinishedBook, useAddReadingBook, useAddWantToRead } from "@/features/add-my-book";
import { Rating } from "@/shared/ui/rating";
import { BookmarkPlus, BookOpen } from "lucide-react";

interface SearchedBookAddActionProps {
  isbn: string;
}

export function SearchedBookAddAction({ isbn }: SearchedBookAddActionProps) {
  const { mutate: mutateAddFinishedBook, isPending: isPendingAddFinishedBook } = useAddFinishedBook();
  const { mutate: mutateAddReadingBook, isPending: isPendingAddReadingBook } = useAddReadingBook();
  const { mutate: mutateAddWantToRead, isPending: isPendingAddWantToRead } = useAddWantToRead();

  const onClickReading = () => {
    mutateAddReadingBook(isbn);
  }

  const onClickWantToRead = () => {
    mutateAddWantToRead(isbn);
  }

  /**
   * TODO: 한줄평 추가하는 모달을 만들기
   */
  const onClickModal = () => {
    console.log('modal')
  }

  const onChange = (rating: number) => {
    mutateAddFinishedBook({rating, isbn})
  }

  return (
    <div className="flex flex-col gap-3 w-full bg-white p-1 rounded-xl">
      <div className="grid grid-cols-3 gap-2.5">
        <button
          type="button"
          onClick={onClickWantToRead}
          className="flex flex-col items-center justify-center py-3 rounded-xl border transition-all active:scale-[0.97] bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
        >
          <BookmarkPlus size={22} className="mb-1.5" />
          <span className="text-xs font-bold">보고 싶어요</span>
        </button>
        <button
          type="button"
          onClick={onClickReading}
          className="flex flex-col items-center justify-center py-3 rounded-xl border transition-all active:scale-[0.97] bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
        >
          <BookOpen size={22} className="mb-1.5" />
          <span className="text-xs font-bold">독서 중</span>
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
          <Rating rating={0} onChange={onChange} />
        </div>
      </div>
    </div>
  )
}