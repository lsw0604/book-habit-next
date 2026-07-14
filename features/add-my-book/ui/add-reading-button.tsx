import { cn } from "@/shared/utils";
import { BookOpen } from "lucide-react";

interface AddReadingButtonProps {
  onClick: () => void;
  isActive: boolean;
  disabled?: boolean;
  className?: string;
}

export function AddReadingButton({ onClick, isActive, disabled, className }: AddReadingButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        // 1. 기본 스타일
        "flex flex-col items-center justify-center py-3 rounded-xl border transition-all active:scale-[0.97]",
        // 2. 활성화 조건부 스타일 (삼항 연산자)
        isActive
          ? "bg-indigo-600 text-white border-transparent shadow-sm shadow-indigo-100"
          : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50",
        // 3. 외부 주입 스타일
        className
      )}
    >
      <BookOpen size={22} className="mb-1.5" />
      <span className="text-xs font-bold">독서 중</span>
    </button>
  )
}