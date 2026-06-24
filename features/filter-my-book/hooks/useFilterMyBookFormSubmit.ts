'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import type { FilterMyBookType } from '../model';

export function useFilterMyBookFormSubmit() {
  const router = useRouter();

  const onSubmit = useCallback(
    (data: FilterMyBookType) => {
      const searchParams = new URLSearchParams();

      if (data.status !== 'ALL') {
        searchParams.set('status', data.status);
      }

      if (data.order !== 'desc') {
        searchParams.set('order', data.order);
      }
      router.replace(`/my_books?${searchParams.toString()}`, { scroll: false});
    },
    [router]
  );

  return {
    onSubmit,
  };
}
