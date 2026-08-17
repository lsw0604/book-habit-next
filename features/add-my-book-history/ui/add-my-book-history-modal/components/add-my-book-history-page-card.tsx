import { BookOpenIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { calculatePages } from '@/entities/my-book-history';
import { Input } from '@/shared/ui/input';
import { selectAllOnFocus } from '@/shared/utils';

import type { AddMyBookHistoryType } from '../../../schema';

export function AddMyBookHistoryPageCard() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<AddMyBookHistoryType>();
  const [startPage, endPage] = watch(['startPage', 'endPage']);

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center">
        독서 페이지 기록<span className="ml-1 text-red-500">*</span>
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="독서 시작 페이지"
          id="startPage"
          type="number"
          inputMode="numeric"
          autoComplete="off"
          min={0}
          error={!!errors.startPage}
          errorMessage={errors.startPage?.message}
          onFocus={selectAllOnFocus}
          {...register('startPage', { valueAsNumber: true })}
        />
        <Input
          label="독서 종료 페이지"
          id="endPage"
          type="number"
          inputMode="numeric"
          autoComplete="off"
          min={0}
          error={!!errors.endPage}
          onFocus={selectAllOnFocus}
          errorMessage={errors.endPage?.message}
          {...register('endPage', { valueAsNumber: true })}
        />
      </div>
      <div className="bg-muted border rounded-lg p-3 w-full">
        <div className="flex items-center gap-1.5 mb-1.5">
          <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">
            읽은 페이지
          </span>
        </div>
        <p className="text-sm text-foreground line-clamp-2">
          {startPage}p ~ {endPage}p (총 {calculatePages(startPage, endPage)}{' '}
          페이지)
        </p>
      </div>
    </div>
  );
}

