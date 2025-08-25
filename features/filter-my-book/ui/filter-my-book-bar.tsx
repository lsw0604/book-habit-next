'use client';

import { useAutoSubmit } from '@/shared/hooks/form';

import {
  FILTER_BOOK_ORDER_OPTIONS,
  FILTER_BOOK_STATUS_OPTIONS,
} from '../constants';
import {
  useFilterMyBookParams,
  useFilterMyBookForm,
  useFilterMyBookFormSubmit,
} from '../hooks';
import { FilterMyBookType } from '../schemas';

import { FilterMyBookController } from './filter-my-book-controller';

export function FilterMyBookBar() {
  const params = useFilterMyBookParams();
  const { control, watch } = useFilterMyBookForm({ ...params });
  const { onSubmit } = useFilterMyBookFormSubmit();

  useAutoSubmit<FilterMyBookType>({
    watch,
    onSubmit,
    dependencies: [watch, onSubmit],
  });

  return (
    <form className="p-4 flex w-full min-w-[240px]">
      <div className="w-full h-auto shadow-lg flex gap-2 relative p-2 rounded-lg">
        <FilterMyBookController
          control={control}
          name="order"
          options={FILTER_BOOK_ORDER_OPTIONS}
        />
        <FilterMyBookController
          control={control}
          name="status"
          options={FILTER_BOOK_STATUS_OPTIONS}
        />
      </div>
    </form>
  );
}
