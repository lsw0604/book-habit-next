'use client';

import type { MyBookFilterType } from '@/features/filter-my-book/model';
import {
  MyBookOrderController,
  MyBookStatusController,
} from '@/features/filter-my-book/ui';
import {
  useMyBookFilterForm,
  useMyBookFilterFormSubmit,
  useMyBookFilterParams,
} from '@/features/filter-my-book/hooks';
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
        <MyBookOrderController control={control} />
        <MyBookStatusController control={control} />
      </div>
    </form>
  );
}
