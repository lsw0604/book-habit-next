import { BookmarkPlus } from 'lucide-react';

import { cn } from '@/shared/utils';

interface MyBookWantToReadButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  className?: string;
}

export function MyBookWantToReadButton({
  onClick,
  isActive = false,
  disabled,
  className,
}: MyBookWantToReadButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex flex-col items-center justify-center py-3 rounded-xl border transition-all active:scale-[0.97]',
        isActive
          ? 'bg-primary text-primary-foreground border-primary font-bold hover:bg-primary/90'
          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50',
        className
      )}
    >
      <BookmarkPlus size={22} className="mb-1.5" />
      <span className="text-xs font-bold">보고 싶어요</span>
    </button>
  );
}
