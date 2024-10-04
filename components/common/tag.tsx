'use client';

import { cn } from '@/utils/class-name';
import { ReactNode } from 'react';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

export default function Tag({ className, children, ...props }: TagProps) {
  return (
    <span
      {...props}
      className={cn(
        'rounded-lg outline-none bg-slate-200 text-black px-2 py-1 text-center text-xs cursor-pointer',
        className
      )}
    >
      {children}
    </span>
  );
}
