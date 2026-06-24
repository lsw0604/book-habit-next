'use client';

import { useAutoSubmit } from '@/shared/hooks/form';

import {
  useFilterMyBookParams,
  useFilterMyBookForm,
  useFilterMyBookFormSubmit,
} from '../hooks';
import {
  type FilterMyBookType,
  FILTER_BOOK_ORDER_OPTIONS,
  FILTER_BOOK_STATUS_OPTIONS,
} from '../model';

import { SelectController } from '@/shared/ui/select-controller';

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
    <form className="bg-white p-4 flex w-full min-w-[240px]">
      <div className="w-full h-auto shadow-lg flex gap-2 relative p-2 rounded-lg">
        <SelectController
          control={control}
          name="order"
          options={FILTER_BOOK_ORDER_OPTIONS}
        />
        <SelectController
          control={control}
          name="status"
          options={FILTER_BOOK_STATUS_OPTIONS}
        />
      </div>
    </form>
  );
}
