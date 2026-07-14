import { cn } from "@/shared/utils";
import { BookmarkPlus } from "lucide-react";

interface AddWantToReadButtonProps {
  onClick: () => void;
  isActive: boolean;
  disabled: boolean;
  className?: string;
}

export function AddWantToReadButton({ onClick, isActive, disabled, className }: AddWantToReadButtonProps) {
  return (
    <button
          type="button"
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "flex flex-col items-center justify-center py-3 rounded-xl border transition-all active:scale-[0.97]",
            isActive 
              ? "bg-indigo-600 text-white border-transparent shadow-sm shadow-indigo-100"
              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
            className
          )}
      >
        <BookmarkPlus size={22} className="mb-1.5" />
        <span className="text-xs font-bold">보고 싶어요</span>
      </button>
    )
}