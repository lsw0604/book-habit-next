'use client';

import type { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';

import { useBookSearchParams } from '@/entities/book';

import { useBookSearchForm } from '../hooks';

export function BookSearchFormProvider({ children }: { children: ReactNode }) {
  const params = useBookSearchParams();
  const methods = useBookSearchForm(params);
  return <FormProvider {...methods}>{children}</FormProvider>;
}
