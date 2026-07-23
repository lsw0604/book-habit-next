import {
  type AddMyBookReviewType,
  addMyBookReviewSchema,
  DEFAULT_ADD_MY_BOOK_REVIEW,
} from '../schema';
import { useFormWithSchema } from '@/shared/hooks/form';

export const useAddMyBookReviewForm = (initialValue?: AddMyBookReviewType) =>
  useFormWithSchema(addMyBookReviewSchema, {
    defaultValues: initialValue ?? DEFAULT_ADD_MY_BOOK_REVIEW,
  });
