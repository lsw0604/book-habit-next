import { FormProvider } from 'react-hook-form';

import { useAddMyBookHistoryForm } from '../hooks';
import { DEFAULT_ADD_MY_BOOK_HISTORY } from '../model';

interface AddMyBookHistoryProviderProps {
  children: React.ReactNode;
  myBookId: number;
  date: Date;
}

export function AddMyBookHistoryProvider({
  children,
  myBookId,
  date,
}: AddMyBookHistoryProviderProps) {
  const methods = useAddMyBookHistoryForm({
    ...DEFAULT_ADD_MY_BOOK_HISTORY,
    myBookId,
    startTime: date,
    endTime: date,
    date,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
