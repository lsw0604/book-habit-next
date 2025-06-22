import type { BookCardAuthorProps } from './types';
import { cn } from '@/shared/utils/class-name';
import { formattedAuthor, formattedTranslator } from '../lib';

const BOOK_CARD_AUTHOR_STYLE = {
  base: 'line-clamp-2 overflow-hidden whitespace-normal break-all text-xs text-gray-800 my-1',
} as const;

export default function BookCardAuthor({
  className,
  authors,
  translators,
}: BookCardAuthorProps) {
  return (
    <p className={cn(BOOK_CARD_AUTHOR_STYLE.base, className)}>
      {formattedAuthor(authors)}
      {translators.length !== 0 && ' | '}
      {formattedTranslator(translators)}
    </p>
  );
}
