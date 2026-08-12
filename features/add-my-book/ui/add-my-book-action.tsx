import { Pencil } from "lucide-react";

import { MyBookReadingButton, MyBookWantToReadButton } from "@/entities/my-book";
import { Rating } from "@/shared/ui/rating";

import { useAddMyBookAction } from "../hooks";

interface AddMyBookActionProps {
  isbn: string;
}

export function AddMyBookAction({ isbn }: AddMyBookActionProps) {
  const {
    handleFinishedClick,
    handleModalClick,
    handleReadingClick,
    handleWantToReadClick
  } = useAddMyBookAction({ isbn });

  return (
    <div className="flex flex-col gap-3 w-full bg-white p-1 rounded-xl">
      <div className="grid grid-cols-3 gap-2.5">
        <MyBookWantToReadButton onClick={handleWantToReadClick} />
        <MyBookReadingButton onClick={handleReadingClick} />
        <button
          type="button"
          onClick={handleModalClick}
          className="flex flex-col items-center justify-center py-3 rounded-xl border transition-all active:scale-[0.97] bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
        >
          <Pencil size={22} className="mb-1.5" />
          <span className="text-xs font-bold">한줄평</span>
        </button>
      </div>
      <div className="w-full p-4 rounded-xl border transition-all">
        <div className="flex justify-center">
          <Rating rating={0} onChange={handleFinishedClick} />
        </div>
      </div>
    </div>
  )
}
