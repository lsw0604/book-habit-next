'use client';

import { useCallback, useState } from 'react';
import { Controller } from 'react-hook-form';

import BookSearchPopover from '@/features/book-search/ui/popover';
import { BookSearchControllerProps } from '@/features/book-search/ui/types';
import useBookSearchFormSubmit from '@/features/book-search/lib/hooks/useBookSearchFormSubmit';
import { useBookSearchFormHandler } from '@/features/book-search/lib/hooks/useBookSearchFormHandler';

import { ErrorMessage } from '@/shared/common/error-message';
import { Input } from '@/shared/ui/input';
import { cn } from '@/shared/utils/class-name';

export default function BookSearchForm() {
  const [formKey, setFormKey] = useState<number>(0);
  const { handleSubmit, control, formState } = useBookSearchFormHandler();

  const onFormSubmit = useCallback(() => {
    setFormKey(prev => prev++);
  }, []);

  const { onSubmit } = useBookSearchFormSubmit(onFormSubmit);

  return (
    <form
      key={formKey}
      className={cn('w-full flex px-4 pb-0 relative gap-2 min-w-[240px]')}
      onSubmit={handleSubmit(onSubmit)}
    >
      <BookSearchInputController control={control} />
      <BookSearchPopover control={control} formState={formState} />
    </form>
  );
}

const BookSearchInputController = ({ control }: BookSearchControllerProps) => {
  return (
    <Controller
      name="query"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <Input
            {...field}
            className="rounded-full"
            placeholder="검색어를 입력해주세요."
            autoComplete="off"
          />
          {!!error && error.message && (
            <ErrorMessage>{error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};
