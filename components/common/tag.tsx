'use client';

import { cn } from '@/utils/class-name';
import { ReactNode } from 'react';

interface TagProps {
  className?: string;
  children: ReactNode;
}

export default function Tag({ className, children }: TagProps) {
  return (
    <span
      className={cn(
        'rounded-lg outline-none bg-slate-200 text-black px-2 py-1 text-center text-xs',
        className
      )}
    >
      {children}
    </span>
  );
}
