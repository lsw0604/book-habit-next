'use client';

import { useBookSearchFormHandler, useBookSearchFormSubmit } from '../hooks';

import BookSearchInputController from './book-search-input-controller';
import BookSearchPopover from './book-search-popover';

export default function BookSearchForm() {
  const { handleSubmit, control, formState, setIsRouting } =
    useBookSearchFormHandler();
  const { onSubmit } = useBookSearchFormSubmit(setIsRouting);

  return (
    <form
      className="w-full relative min-w-[240px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full h-auto shadow-lg flex gap-2 relative p-2 rounded-lg">
        <BookSearchInputController control={control} />
        <BookSearchPopover control={control} formState={formState} />
      </div>
    </form>
  );
}
