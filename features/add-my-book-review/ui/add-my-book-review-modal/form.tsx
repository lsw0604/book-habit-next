import { useFormContext } from 'react-hook-form';

import { useModal } from '@/entities/modal';
import { Button } from '@/shared/ui/button';

import { useAddMyBookReview } from '../../hooks';
import type { AddMyBookReviewType } from '../../schema';

import { AddMyBookReviewControllerIsPublic } from './controller-is-public';
import { AddMyBookReviewControllerReview } from './controller-review';

interface AddMyBookReviewModalFormProps {
  myBookId: number;
  isbn?: string;
}

export function AddMyBookReviewModalForm({ myBookId, isbn }: AddMyBookReviewModalFormProps) {
  const { close } = useModal();
  const { handleSubmit, formState: { isSubmitting } } = useFormContext<AddMyBookReviewType>();

  const { mutate } = useAddMyBookReview(myBookId, isbn);

  const onSubmit = (data: AddMyBookReviewType) => {
    mutate(data, {
      onSuccess: () => close(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-grow h-full"
    >
      <div className="flex-grow space-y-8 overflow-y-auto scrollbar-none p-4">
        <AddMyBookReviewControllerIsPublic />
        <AddMyBookReviewControllerReview />
      </div>
      <div className="mt-auto p-4">
      <Button
        key="submit-btn"
        type="submit"
        isLoading={isSubmitting}
        disabled={isSubmitting}
        className="w-full"
      >
        등록하기
      </Button>
    </div>
    </form>
  );
}
