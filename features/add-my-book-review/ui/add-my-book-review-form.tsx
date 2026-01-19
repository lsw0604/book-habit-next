import { useFormContext } from 'react-hook-form';

import { useModal } from '@/entities/modal';
import {
  AddMyBookReviewType,
  useAddMyBookReview,
} from '@/entities/my-book-review';

import { AddMyBookReviewButtons } from './add-my-book-review-buttons';
import { AddMyBookReviewFields } from './add-my-book-review-fields';

interface AddMyBookReviewFormProps {
  myBookId: number;
}

export function AddMyBookReviewForm({ myBookId }: AddMyBookReviewFormProps) {
  const { close } = useModal();
  const { handleSubmit } = useFormContext<AddMyBookReviewType>();

  const { mutate } = useAddMyBookReview(myBookId);

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
      <AddMyBookReviewFields />
      <AddMyBookReviewButtons />
    </form>
  );
}
