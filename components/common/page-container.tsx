import { ReactNode } from 'react';
import { cn } from '@/utils/class-name';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'vertical' | 'horizontal';
}

const PageContainer = ({
  children,
  className,
  variant = 'default',
}: PageContainerProps) => {
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
};

export default PageContainer;
