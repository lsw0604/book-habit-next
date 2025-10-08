import { FormProvider } from 'react-hook-form';

import { DEFAULT_ADD_MY_BOOK_REVIEW } from '@/entities/my-book-review';

import { useAddMyBookReviewForm } from '../hooks';

interface AddMyBookReviewProviderProps {
  children: React.ReactNode;
  myBookId: number;
}

export function AddMyBookReviewProvider({
  children,
  myBookId,
}: AddMyBookReviewProviderProps) {
  const methods = useAddMyBookReviewForm({
    ...DEFAULT_ADD_MY_BOOK_REVIEW,
    myBookId,
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
