'use client';

import type { BookSearchControllerProps } from '../model/types';
import React from 'react';
import { Controller } from 'react-hook-form';
import { ErrorMessage } from '@/shared/ui/error-message';
import { Input } from '@/shared/ui/input';

const BookSearchInputController: React.FC<BookSearchControllerProps> = ({
  control,
}) => {
  return (
    <Controller
      name="query"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full">
          <Input
            {...field}
            className="rounded-full"
            placeholder="검색어를 입력해주세요."
            autoComplete="off"
          />
          {!!error && error.message && (
            <ErrorMessage>{error.message}</ErrorMessage>
          )}
        </div>
      )}
    />
  );
};

export default BookSearchInputController;
