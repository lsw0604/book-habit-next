'use client';

import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import type { BookSearchParamsType } from '@/entities/book/schemas';
import { Button } from '@/shared/ui/button';

import { buildBookSearchURL } from '../lib';

import { BookSearchPopover } from './book-search-popover';
import { BookSearchQueryField } from './book-search-query-field';

export function BookSearchForm() {
  const router = useRouter();
  const { handleSubmit } = useFormContext<BookSearchParamsType>();

  const onSubmit = useCallback(
    (data: BookSearchParamsType) => {
      router.push(buildBookSearchURL(data));
    },
    [router]
  );

  return (
    <form
      role="search"
      aria-label="도서 검색"
      className="w-full relative min-w-[240px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full h-auto shadow-lg flex gap-2 relative p-2 rounded-lg">
        <BookSearchPopover />
        <BookSearchQueryField />
        <Button key="search-btn" type="submit">
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
}
