'use client';

import type { MyBookParamsType } from '@/entities/my-book/model/schema';
import MyBookOrderController from './my-book-order-controller';
import MyBookStatusController from './my-book-status-controller';
import { useAutoSubmit } from '@/shared/hooks/form/useAutoSubmit';
import {
  useMyBookForm,
  useMyBokFormSubmit,
  useMyBookParams,
} from '@/features/my-book/lib/hooks';

export default function MyBook() {
  const params = useMyBookParams();
  const { control, watch } = useMyBookForm({ ...params });
  const { onSubmit } = useMyBokFormSubmit();

  useAutoSubmit<MyBookParamsType>({
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
