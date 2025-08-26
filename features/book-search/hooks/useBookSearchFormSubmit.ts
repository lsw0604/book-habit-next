'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import type { BookSearchParamsType } from '../schemas';

export function useBookSearchFormSubmit() {
  const router = useRouter();

  const onSubmit = useCallback(
    (data: BookSearchParamsType) => {
      const searchParams = new URLSearchParams();

      if (data.query) searchParams.set('query', data.query);
      if (data.size) searchParams.set('size', data.size.toString());
      if (data.sort) searchParams.set('sort', data.sort);
      if (data.target) searchParams.set('target', data.target);

      router.push(`/search?${searchParams.toString()}`);
    },
    [router]
  );

  return {
    onSubmit,
  };
}
