'use client';

import { DotIcon, ListFilterIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/shared/ui/button';
import { Popover } from '@/shared/ui/popover';

import {
  BookSearchSizeController,
  BookSearchSortController,
  BookSearchTargetController,
} from './controller';

export function BookSearchPopover() {
  const { formState } = useFormContext();

  const shouldShowError =
    formState.isSubmitted &&
    (formState.errors.target || formState.errors.size || formState.errors.sort);

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
        <BookSearchTargetController />
        <BookSearchSizeController />
        <BookSearchSortController />
      </Popover.Content>
    </Popover>
  );
}
