import { FormProvider } from 'react-hook-form';

import { useMyBookReview } from '@/entities/my-book-review';

import { useUpdateMyBookReviewForm } from '../../hooks';

interface UpdateMyBookReviewModalProviderProps {
  children: React.ReactNode;
  myBookId: number;
}

export function UpdateMyBookReviewModalProvider({
  children,
  myBookId,
}: UpdateMyBookReviewModalProviderProps) {
  const { data: reviewData } = useMyBookReview(myBookId);

  const values = reviewData
    ? {
        isPublic: reviewData.isPublic,
        review: reviewData.review,
      }
    : undefined;

  const methods = useUpdateMyBookReviewForm(values);

  return <FormProvider {...methods}>{children}</FormProvider>;
}
