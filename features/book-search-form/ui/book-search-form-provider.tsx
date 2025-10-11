'use client';

import type { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';

import { useBookSearchForm, useBookSearchParams } from '../hooks';

export function BookSearchFormProvider({ children }: { children: ReactNode }) {
  const params = useBookSearchParams();
  const methods = useBookSearchForm(params);
  return <FormProvider {...methods}>{children}</FormProvider>;
}
