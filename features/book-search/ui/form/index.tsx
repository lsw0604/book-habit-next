'use client';

import { SearchIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { Button } from '@/shared/ui/button';

import { BookSearchPopover } from './book-search-form-popover';
import { BookSearchQueryField } from './fields';
import type { BookSearchParams } from '../../model';

function buildURL(data: BookSearchParams) {
  const params = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    params.set(key, value.toString());
  });

  return `/search?${params.toString()}`;
}

export function BookSearchForm() {
  const router = useRouter();
  const { handleSubmit } = useFormContext<BookSearchParams>();

  const onSubmit = useCallback(
    (data: BookSearchParams) => {
      router.push(buildURL(data));
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
