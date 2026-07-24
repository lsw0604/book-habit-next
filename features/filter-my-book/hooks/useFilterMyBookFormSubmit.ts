'use client';

import { useRouter, usePathname } from 'next/navigation';

import type { FilterMyBookType } from '../schema';

export function useFilterMyBookFormSubmit() {
  const router = useRouter();
  const pathname = usePathname();

  const onSubmit = (data: FilterMyBookType) => {
    const searchParams = new URLSearchParams();

    if (data.status !== 'ALL') searchParams.set('status', data.status);
    if (data.order !== 'desc') searchParams.set('order', data.order);

    router.replace(`${pathname}?${searchParams.toString()}`, { scroll: false });
  };

  return {
    onSubmit,
  };
}
