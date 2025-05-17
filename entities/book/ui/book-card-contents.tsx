import { cn } from '@/shared/utils/class-name';
import { HTMLAttributes } from 'react';

interface BookCardContentProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  contents: string;
  variant?: 'list' | 'grid';
}

export default function BookCardContents({
  className,
  contents,
  variant = 'list',
  ...props
}: BookCardContentProps) {
  return (
    <p
      className={cn(
        'text-sm font-normal text-gray-800',
        variant === 'list' && 'break-all line-clamp-2',
        variant === 'grid' && '',
        className
      )}
      {...props}
    >
      {contents === '' ? '해당 책의 정보가 등록되지 않았습니다.' : contents}
    </p>
  );
}
