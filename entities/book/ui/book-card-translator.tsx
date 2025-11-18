import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

import { formattedTranslator } from '../lib';

interface BookCardTranslatorProps extends HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  translators: string[];
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
      {formattedTranslator(translators)}
    </p>
  );
}
