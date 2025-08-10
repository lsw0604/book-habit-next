'use client';

import {
  useMyBookFilterForm,
  useMyBookFilterFormSubmit,
  useMyBookFilterParams,
} from '@/features/filter-my-book/hooks';
import {
  MyBookFilterType,
  FILTER_BOOK_ORDER_OPTIONS,
  FILTER_BOOK_STATUS_OPTIONS,
} from '@/features/filter-my-book/model';
import { MyBookFilterController } from '@/features/filter-my-book/ui';
import { useAutoSubmit } from '@/shared/hooks/form/useAutoSubmit';

export default function MyBookFilterBar() {
  const params = useMyBookFilterParams();
  const { control, watch } = useMyBookFilterForm({ ...params });
  const { onSubmit } = useMyBookFilterFormSubmit();

  useAutoSubmit<MyBookFilterType>({
    watch,
    onSubmit,
    dependencies: [watch, onSubmit],
  });

  return (
    <form className="p-4 flex w-full min-w-[240px]">
      <div className="w-full h-auto shadow-lg flex gap-2 relative p-2 rounded-lg">
        <MyBookFilterController
          control={control}
          name="order"
          options={FILTER_BOOK_ORDER_OPTIONS}
        />
        <MyBookFilterController
          control={control}
          name="status"
          options={FILTER_BOOK_STATUS_OPTIONS}
        />
      </div>
    </form>
  );
}
