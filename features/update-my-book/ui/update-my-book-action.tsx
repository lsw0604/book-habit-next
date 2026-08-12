import { PencilLine } from "lucide-react";

import { MyBookReadingButton, MyBookWantToReadButton, type MyBookDetail } from "@/entities/my-book";
import { Rating } from "@/shared/ui/rating";

import { useUpdateMyBookAction } from "../hooks";

interface UpdateMyBookActionProps {
  data: MyBookDetail;
  onReviewClick: () => void;
}

export function UpdateMyBookAction({ data, onReviewClick }: UpdateMyBookActionProps) {
  const { isReading, isWantToRead, handleChangeRating, handleReadingClick, handleWantToReadClick } = useUpdateMyBookAction({ data });

  return (
    <div className="flex flex-col gap-3 w-full bg-white p-1 rounded-xl">
      <div className="grid grid-cols-3 gap-2.5">
        <MyBookWantToReadButton onClick={handleWantToReadClick} isActive={isWantToRead} />
        <MyBookReadingButton onClick={handleReadingClick} isActive={isReading} />
        <button
          type="button"
          onClick={onReviewClick}
          className="flex flex-col items-center justify-center py-3 rounded-xl border transition-all active:scale-[0.97] bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
        >
          <PencilLine size={22} className="mb-1.5" />
          <span className="text-xs font-bold">한줄평 등록</span>
        </button>
      </div>
      <div className="w-full p-4 rounded-xl border transition-all">
        <div className="flex justify-center">
          <Rating rating={data.rating} onChange={handleChangeRating} />
        </div>
      </div>
    </div>
  )
}
