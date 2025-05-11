'use client';

import type { BookSearchFormProps } from '../model/types';
import {
  useBookSearchFormHandler,
  useBookSearchFormSubmit,
} from '@/features/book-search/lib/hooks';
import { cn } from '@/shared/utils/class-name';
import BookSearchInputController from './book-search-input-controller';
import BookSearchPopover from './book-search-popover';

const BookSearchForm: React.FC<BookSearchFormProps> = ({ className }) => {
  const { handleSubmit, control, formState, setIsRouting } =
    useBookSearchFormHandler();
  const { onSubmit } = useBookSearchFormSubmit(setIsRouting);

  return (
    <form
      className={cn('w-full px-4 relative min-w-[240px]', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full h-auto shadow-lg flex gap-2 relative p-2 rounded-lg">
        <BookSearchInputController control={control} />
        <BookSearchPopover control={control} formState={formState} />
      </div>
    </form>
  );
};

export default BookSearchForm;
