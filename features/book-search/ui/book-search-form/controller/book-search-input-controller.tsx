'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { Input } from '@/shared/ui/input';

import type { BookSearchParamsType } from '../../../schemas';

export function BookSearchQueryController() {
  const { control } = useFormContext<BookSearchParamsType>();
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
            {...field}
          />
        </div>
      )}
    />
  );
}
