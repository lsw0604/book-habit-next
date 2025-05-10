'use client';

import type { BookSearchControllerProps } from '../types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Label } from '@/shared/ui/label';
import { Slider } from '@/shared/ui/slider';
import { ErrorMessage } from '@/shared/ui/error-message';

const BookSearchSizeController: React.FC<BookSearchControllerProps> = ({
  control,
}: BookSearchControllerProps) => {
  return (
    <Controller
      name="size"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="px-4 w-60">
          <Label className="text-sm font-bold">
            페이지 크기{' '}
            <span className="text-lg font-normal text-foreground">{value}</span>
          </Label>
          <Slider
            className="my-4"
            value={[value]}
            step={10}
            min={10}
            max={50}
            onValueChange={val => onChange(val[0])}
          />
          {!!error?.message && (
            <ErrorMessage className="my-2">{error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

export default BookSearchSizeController;
