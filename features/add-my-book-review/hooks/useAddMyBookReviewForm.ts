import {
  type AddMyBookReviewType,
  addMyBookReviewSchema,
  DEFAULT_ADD_MY_BOOK_REVIEW,
} from '@/entities/my-book-review';
import { useFormWithSchema } from '@/shared/hooks/form';

export const useAddMyBookReviewForm = (initialValue?: AddMyBookReviewType) =>
  useFormWithSchema(addMyBookReviewSchema, {
    defaultValues: initialValue ?? DEFAULT_ADD_MY_BOOK_REVIEW,
  });
