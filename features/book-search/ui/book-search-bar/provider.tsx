'use client';

import type { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';

import { useQueryParams } from '@/shared/hooks';

import { useBookSearchForm } from '../../hooks';
import { bookSearchParamsSchema } from '../../schema';

export function BookSearchProvider({ children }: { children: ReactNode }) {
  const params = useQueryParams(bookSearchParamsSchema);
  const methods = useBookSearchForm(params);
  return <FormProvider {...methods}>{children}</FormProvider>;
}
