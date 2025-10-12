'use client';

import { Controller, useFormContext } from 'react-hook-form';

import type { BookSearchParamsType } from '@/entities/book';
import { Input } from '@/shared/ui/input';

export function BookSearchQueryField() {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<BookSearchParamsType>();

  return (
    <Controller
      name="query"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <Input
            className="rounded-full"
            placeholder="검색어를 입력해주세요."
            autoComplete="off"
            error={!!error}
            errorMessage={error?.message}
            disabled={isSubmitting}
            {...field}
          />
        </div>
      )}
    />
  );
}
