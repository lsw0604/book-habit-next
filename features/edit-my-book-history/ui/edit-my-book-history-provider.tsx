import type { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';

import {
  type SerializedMyBookHistory,
  deserializeMyBookHistory,
} from '@/entities/my-book-history';

import { useEditMyBookHistoryForm } from '../hooks';

interface EditMyBookHistoryProviderProps {
  children: ReactNode;
  selectedHistory: SerializedMyBookHistory;
}

export function EditMyBookHistoryProvider({
  children,
  selectedHistory,
}: EditMyBookHistoryProviderProps) {
  const methods = useEditMyBookHistoryForm(
    deserializeMyBookHistory(selectedHistory)
  );

  return <FormProvider {...methods}>{children}</FormProvider>;
}
