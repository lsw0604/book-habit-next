'use client';

import { Controller, useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@/shared/ui/error-message';
import { Label } from '@/shared/ui/label';
import { RadioGroup, RadioGroupItem } from '@/shared/ui/radio-group';

import type { BookSearchFormType } from '../model';

export function BookSearchSortField() {
  const { control } = useFormContext<BookSearchFormType>();

  return (
    <Controller
      name="sort"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="px-4 w-60">
          <Label className="text-sm font-bold">정렬 유형</Label>
          <RadioGroup
            className="flex gap-2 my-2"
            value={value}
            onValueChange={onChange}
          >
            <div className="w-full">
              <RadioGroupItem className="mr-2" value="accuracy" id="accuracy" />
              <Label htmlFor="accuracy">정확순</Label>
            </div>
            <div className="w-full">
              <RadioGroupItem className="mr-2" value="latest" id="latest" />
              <Label htmlFor="latest">최신순</Label>
            </div>
          </RadioGroup>
          {!!error?.message && (
            <ErrorMessage className="my-2">{error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
}
