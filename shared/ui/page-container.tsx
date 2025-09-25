import { ReactNode } from 'react';

import { cn } from '@/shared/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'vertical' | 'horizontal';
}

export function PageContainer({
  children,
  className,
  variant = 'default',
}: PageContainerProps) {
  return (
    <div
      className={cn(
        'w-full flex-grow',
        variant === 'vertical' && 'flex flex-col relative',
        variant === 'horizontal' && 'flex flex-row relative',
        className
      )}
    >
      {children}
    </div>
  );
}
