import type { HTMLAttributes } from 'react';

import { cn, createMarkUp } from '@/shared/utils';

interface BookCardDescriptionProps
  extends HTMLAttributes<HTMLParagraphElement> {
  content?: string;
}

export function BookCardDescription({
  content,
  className,
  ...props
}: BookCardDescriptionProps) {
  const hasContent = !!content;

  if (hasContent)
    return (
      <p
        className={cn('text-sm font-normal text-gray-800 h-20', className)}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={createMarkUp(content)}
        {...props}
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
