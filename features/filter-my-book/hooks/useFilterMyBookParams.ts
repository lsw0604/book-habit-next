'use client';

import { useSearchParams } from 'next/navigation';

import { parseFilterMyBookParams } from '../lib';
import type { FilterMyBookType } from '../schema';

export const useFilterMyBookParams = (): FilterMyBookType => {
  const searchParams = useSearchParams();

  return parseFilterMyBookParams({
    order: searchParams.get('order'),
    status: searchParams.get('status'),
  });
};
