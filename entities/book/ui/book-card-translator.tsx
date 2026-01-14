import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

import { BookDetail } from '../model';

interface BookCardTranslatorProps
  extends HTMLAttributes<HTMLParagraphElement>,
    Pick<BookDetail, 'translators'> {
  className?: string;
}

export function BookCardTranslator({
  className,
  translators,
  ...props
}: BookCardTranslatorProps) {
  return (
    <p
      className={cn(
        'line-clamp-1 flex break-all text-xs font-medium text-gray-500',
        className
      )}
      {...props}
    >
      {translators}
    </p>
  );
}
