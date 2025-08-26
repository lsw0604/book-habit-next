'use client';

import { FormProvider } from 'react-hook-form';

import {
  useBookSearchForm,
  useBookSearchFormSubmit,
  useBookSearchParams,
} from '../../hooks';

import { BookSearchPopover } from './book-search-popover';
import { BookSearchQueryController } from './controller';

export function BookSearchForm() {
  const params = useBookSearchParams();
  const methods = useBookSearchForm(params);
  const { onSubmit } = useBookSearchFormSubmit();

  return (
    <FormProvider {...methods}>
      <form
        className="w-full relative min-w-[240px]"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="w-full h-auto shadow-lg flex gap-2 relative p-2 rounded-lg">
          <BookSearchQueryController />
          <BookSearchPopover />
        </div>
      </form>
    </FormProvider>
  );
}
