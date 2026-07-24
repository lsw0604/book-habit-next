'use client';

import { useSearchParams } from 'next/navigation';

import { MyBookStatus } from '@/entities/my-book';

import { FilterMyBookOrder } from '../model';
import { filterMyBookSchema } from '../schema';

export const useFilterMyBookParams = (): {
  order: FilterMyBookOrder;
  status: 'ALL' | MyBookStatus;
} => {
  const searchParams = useSearchParams();
  const params = {
    order: searchParams.get('order'),
    status: searchParams.get('status') || 'ALL',
  };

  const result = filterMyBookSchema.safeParse(params);

  if (!result.success) {
    return { order: FilterMyBookOrder.desc, status: 'ALL' };
  }

  return result.data;
};
