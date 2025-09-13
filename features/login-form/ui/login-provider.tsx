'use client';

import { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';

import { useLoginForm } from '../hooks';

export function LoginProvider({ children }: { children: ReactNode }) {
  const methods = useLoginForm();

  return <FormProvider {...methods}>{children}</FormProvider>;
}
