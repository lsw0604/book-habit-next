import type { HTMLAttributes } from 'react';

import { cn, createMarkUp } from '@/shared/utils';

interface BookCardContentProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  bookContent: string | null;
}

export function BookCardContent({
  bookContent,
  className,
  ...props
}: BookCardContentProps) {
  const hasContent = !!bookContent;

  if (hasContent)
    return (
      <p
        className={cn('text-sm font-normal text-gray-800 h-20', className)}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={createMarkUp(bookContent)}
      />
    );

  return (
    <p
      className={cn('text-sm font-normal text-gray-800 h-20', className)}
      {...props}
    >
      해당 책의 정보가 등록되지 않았습니다.
    </p>
  );
}
