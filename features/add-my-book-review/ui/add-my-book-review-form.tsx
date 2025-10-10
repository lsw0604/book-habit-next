import { useFormContext } from 'react-hook-form';

import { closeModal } from '@/entities/modal';
import {
  AddMyBookReviewType,
  useAddMyBookReview,
} from '@/entities/my-book-review';
import { useAppDispatch } from '@/shared/redux';

import { AddMyBookReviewButtons } from './add-my-book-review-buttons';
import { AddMyBookReviewFields } from './add-my-book-review-fields';

interface AddMyBookReviewFormProps {
  myBookId: number;
}

export function AddMyBookReviewForm({ myBookId }: AddMyBookReviewFormProps) {
  const dispatch = useAppDispatch();
  const { handleSubmit } = useFormContext<AddMyBookReviewType>();

  const { mutate } = useAddMyBookReview(myBookId);

  const onSubmit = (data: AddMyBookReviewType) => {
    mutate(data, {
      onSuccess: () => dispatch(closeModal()),
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
