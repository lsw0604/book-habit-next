import type { ReactNode } from 'react';
import { FormProvider } from 'react-hook-form';

import {
  type SerializedMyBookHistory,
  deserializeMyBookHistory,
} from '@/entities/my-book-history';

import { useUpdateMyBookHistoryForm } from '../../hooks';

interface UpdateMyBookHistoryProviderProps {
  children: ReactNode;
  selectedHistory: SerializedMyBookHistory;
}

export function UpdateMyBookHistoryProvider({
  children,
  selectedHistory,
}: UpdateMyBookHistoryProviderProps) {
  const methods = useUpdateMyBookHistoryForm(
    deserializeMyBookHistory(selectedHistory)
  );

  return <FormProvider {...methods}>{children}</FormProvider>;
}
