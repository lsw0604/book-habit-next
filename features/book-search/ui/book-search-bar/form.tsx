'use client';

import { SearchIcon } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/shared/ui/button';

import { BookSearchPopover } from './popover';
import { BookSearchQueryController } from './query-controller';
import type { BookSearchParams } from '../../schema';
import { useBookSearchFormSubmit } from '../../hooks';

export function BookSearchForm() {
  const { onSubmit } = useBookSearchFormSubmit();  
  const { handleSubmit } = useFormContext<BookSearchParams>();

  return (
    <form
      role="search"
      aria-label="도서 검색"
      className="w-full relative min-w-[240px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full h-auto shadow-lg flex gap-2 relative p-2 rounded-lg">
        <BookSearchPopover />
        <BookSearchQueryController />
        <Button key="search-btn" type="submit">
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
}
