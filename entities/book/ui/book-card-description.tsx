import type { HTMLAttributes } from 'react';

import { cn, createMarkUp } from '@/shared/utils';

import { BookDetail } from '../model';

interface BookCardDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement>,
    Pick<BookDetail, 'description'> {
  className?: string;
}

export function BookCardDescription({
  description,
  className,
  ...props
}: BookCardDescriptionProps) {
  const hasContent = !!description;

  if (hasContent)
    return (
      <p
        className={cn('text-sm font-normal text-gray-800 h-20', className)}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={createMarkUp(description)}
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
