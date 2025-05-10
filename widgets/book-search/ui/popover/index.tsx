'use client';

import type { BookSearchPopoverProps } from '../../model/types';
import React from 'react';
import { DotIcon, ListFilterIcon } from 'lucide-react';

import BookSearchTargetController from '@/features/book-search/ui/target-controller';
import BookSearchSizeController from '@/features/book-search/ui/size-controller';
import BookSearchSortController from '@/features/book-search/ui/sort-controller';
import Popover from '@/shared/common/popover';
import { Button } from '@/shared/ui/button';
import { hasFormErrors } from '../../utils';

const BookSearchPopover: React.FC<BookSearchPopoverProps> = ({
  control,
  formState,
}: BookSearchPopoverProps) => {
  return (
    <Popover>
      <Popover.Trigger>
        {hasFormErrors(formState) && (
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
