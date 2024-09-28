'use client';

import { cn } from '@/utils/class-name';

interface LoaderProps {
  size?: number;
  className?: string;
}

export default function Loader({ size, className }: LoaderProps) {
  return (
    <div
      className={cn(
        'flex relative justify-center items-center w-4 h-4 text-',
        size && `w-${size * 4} h-${size * 4}`
      )}
    >
      <div
        className={cn(
          className,
          'w-full h-full border-2 rounded-full border-solid animate-spin border-t-transparent border-t-2'
        )}
      />
    </div>
  );
}
