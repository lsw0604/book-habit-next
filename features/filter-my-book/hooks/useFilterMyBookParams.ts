'use client';

import { useSearchParams } from 'next/navigation';

import { MyBookStatus } from '@/entities/my-book';

import { FilterMyBookOrder, filterMyBookSchema } from '../model';

export const useFilterMyBookParams = (): {
  order: FilterMyBookOrder;
  status: 'ALL' | MyBookStatus;
} => {
  const searchParams = useSearchParams();

  const rawData = {
    order: searchParams.get('order'),
    status: searchParams.get('status'),
  };

  const result = filterMyBookSchema.safeParse(rawData);

  if (!result.success) {
    return { order: FilterMyBookOrder.desc, status: 'ALL' };
  }

  return result.data;
};
