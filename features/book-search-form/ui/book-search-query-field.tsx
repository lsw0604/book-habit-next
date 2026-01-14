'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/shared/ui/input';

import type { BookSearchFormType } from '../model';

export function BookSearchQueryField() {
  const {
    control,
    formState: { isSubmitting },
  } = useFormContext<BookSearchFormType>();

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
