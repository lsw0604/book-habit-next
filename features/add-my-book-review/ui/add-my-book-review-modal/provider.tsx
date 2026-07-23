import { FormProvider } from 'react-hook-form';

import { DEFAULT_ADD_MY_BOOK_REVIEW } from '../../schema';
import { useAddMyBookReviewForm } from '../../hooks';

interface AddMyBookReviewModalProviderProps {
  children: React.ReactNode;
  myBookId: number;
}

export function AddMyBookReviewModalProvider({
  children,
  myBookId,
}: AddMyBookReviewModalProviderProps) {
  const methods = useAddMyBookReviewForm({
    ...DEFAULT_ADD_MY_BOOK_REVIEW,
    myBookId,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
