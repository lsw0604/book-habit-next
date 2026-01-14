'use client';

import { useSearchParams } from 'next/navigation';

import { parseParam } from '@/shared/utils';

import { queryParser, sizeParser, sortParser, targetParser } from '../lib';
import { Sort, Target } from '../model';

export interface UseBookSearchParamsResult {
  query: string;
  size: number;
  sort: Sort;
  target: Target;
}

export const useBookSearchParams = (): UseBookSearchParamsResult => {
  const searchParams = useSearchParams();

  return {
    query: parseParam(searchParams, 'query', queryParser, ''),
    size: parseParam(searchParams, 'size', sizeParser, 10),
    sort: parseParam(searchParams, 'sort', sortParser, Sort.ACCURACY),
    target: parseParam(searchParams, 'target', targetParser, Target.TITLE),
  };
};
