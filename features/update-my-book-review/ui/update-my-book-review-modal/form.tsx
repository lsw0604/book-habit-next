import { useFormContext } from 'react-hook-form';

import { useModal } from '@/entities/modal';
import { useMyBookReview } from '@/entities/my-book-review';
import { Button } from '@/shared/ui/button';

import { useUpdateMyBookReview } from '../../hooks';
import type { UpdateMyBookReviewType } from '../../schema';

import { UpdateMyBookReviewControllerIsPublic } from './controller-is-public';
import { UpdateMyBookReviewControllerReview } from './controller-review';

interface UpdateMyBookReviewModalFormProps {
  myBookId: number;
}

export function UpdateMyBookReviewModalForm({ myBookId }: UpdateMyBookReviewModalFormProps) {
  const { close } = useModal();
  const { data: reviewData } = useMyBookReview(myBookId);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext<UpdateMyBookReviewType>();

  const myBookReviewId = reviewData?.id ?? 0;
  const { mutate } = useUpdateMyBookReview(myBookId, myBookReviewId);

  const onSubmit = (data: UpdateMyBookReviewType) => {
    if (!myBookReviewId) return;

    mutate(data, {
      onSuccess: () => close(),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-grow h-full">
      <div className="flex-grow space-y-8 overflow-y-auto scrollbar-none p-4">
        <UpdateMyBookReviewControllerIsPublic />
        <UpdateMyBookReviewControllerReview />
      </div>
      <div className="mt-auto p-4">
        <Button
          key="submit-btn"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting || !myBookReviewId}
          className="w-full"
        >
          수정하기
        </Button>
      </div>
    </form>
  );
}
