'use client';

import { DotIcon, ListFilterIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import { Popover } from '@/shared/ui/popover';

import type { BookSearchParamsType } from '../schemas';

import { BookSearchSizeField } from './book-search-size-field';
import { BookSearchSortField } from './book-search-sort-field';
import { BookSearchTargetField } from './book-search-target-field';

export function BookSearchPopover() {
  const {
    formState: {
      isSubmitted,
      errors: { target, size, sort },
    },
  } = useFormContext<BookSearchParamsType>();

  const shouldShowError = isSubmitted && (target || size || sort);

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
        <BookSearchTargetField />
        <BookSearchSizeField />
        <BookSearchSortField />
      </Popover.Content>
    </Popover>
  );
}
