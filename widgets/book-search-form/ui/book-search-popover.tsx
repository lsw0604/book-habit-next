'use client';

import type { BookSearchControllerProps } from '../model/types';
import React from 'react';
import { useWatch } from 'react-hook-form';
import { DotIcon, ListFilterIcon } from 'lucide-react';

import BookSearchTargetController from './book-search-target-controller';
import BookSearchSizeController from './book-search-size-controller';
import BookSearchSortController from './book-search-sort-controller';
import { Popover } from '@/shared/ui/popover';
import { Button } from '@/shared/ui/button';
import { hasFormErrors } from '../utils';

const BookSearchPopover: React.FC<BookSearchControllerProps> = ({
  control,
  formState,
}: BookSearchControllerProps) => {
  const query = useWatch({
    control,
    name: 'query',
    defaultValue: '',
  });

  const shouldShowError =
    formState &&
    formState.isSubmitted &&
    hasFormErrors(formState) &&
    (query.trim() !== '' ||
      formState.errors.target ||
      formState.errors.size ||
      formState.errors.sort);

  return (
    <Popover>
      <Popover.Trigger>
        {shouldShowError && (
          <DotIcon className="absolute left-[-1.25rem] top-[-1.25rem] w-12 h-12 stroke-red-500" />
        )}
        <Button type="button" className="rounded-full" variant="ghost">
          <ListFilterIcon className="w-4 h-4" />
        </Button>
      </Popover.Trigger>
      <Popover.Content className="top-12 right-0 px-2 py-4 z-9999">
        <BookSearchTargetController control={control} />
        <BookSearchSizeController control={control} />
        <BookSearchSortController control={control} />
      </Popover.Content>
    </Popover>
  );
};

export default BookSearchPopover;
