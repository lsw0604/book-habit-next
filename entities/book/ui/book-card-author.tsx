import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

import { formattedAuthor, formattedTranslator } from '../lib';

interface BookCardAuthorProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  authors: string[];
  translators: string[];
}

export function BookCardAuthor({
  className,
  authors,
  translators,
  ...props
}: BookCardAuthorProps) {
  return (
    <p
      className={cn(
        'line-clamp-2 overflow-hidden whitespace-normal break-all text-xs text-gray-800 my-1',
        className
      )}
      {...props}
    >
      {formattedAuthor(authors)}
      {translators.length !== 0 && ' | '}
      {formattedTranslator(translators)}
    </p>
  );
}
