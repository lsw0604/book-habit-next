'use client';

import type { BookSearchFormProps } from '../../model/types';
import {
  useBookSearchFormHandler,
  useBookSearchFormSubmit,
} from '@/features/book-search/lib/hooks';
import { cn } from '@/shared/utils/class-name';
import { useCallback, useState } from 'react';
import BookSearchInputController from '@/features/book-search/ui/input-controller';
import BookSearchPopover from '../popover';
import { getFormKey } from '../../utils';

const BookSearchForm: React.FC<BookSearchFormProps> = ({ className }) => {
  const [formKey, setFormKey] = useState<number>(getFormKey());
  const { handleSubmit, control, formState } = useBookSearchFormHandler();

  const onFormSubmit = useCallback(() => {
    setFormKey(getFormKey());
  }, []);

  const { onSubmit } = useBookSearchFormSubmit(onFormSubmit);

  return (
    <form
      key={formKey}
      className={cn(
        'w-full flex px-4 pb-0 relative gap-2 min-w-[240px]',
        className
      )}
      onSubmit={handleSubmit(onSubmit)}
    >
      <BookSearchInputController control={control} />
      <BookSearchPopover control={control} formState={formState} />
    </form>
  );
};

export default BookSearchForm;
