import { cn } from '@/shared/utils/class-name';

import type { BookCardContentProps } from './types';

export default function BookCardContent({
  className,
  content,
  ...props
}: BookCardContentProps) {
  return (
    <p
      className={cn('text-sm font-normal text-gray-800', className)}
      {...props}
    >
      {content === '' ? '해당 책의 정보가 등록되지 않았습니다.' : content}
    </p>
  );
}
