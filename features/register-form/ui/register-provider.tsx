'use client';

import { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';

import { useRegisterForm } from '../hooks';

export function RegisterProvider({ children }: { children: ReactNode }) {
  const methods = useRegisterForm();

  return <FormProvider {...methods}>{children}</FormProvider>;
}
