import { useFormWithSchema } from '@/shared/hooks';

import {
  type UpdateMyBookReviewType,
  DEFAULT_UPDATE_MY_BOOK_REVIEW,
  updateMyBookReviewSchema,
} from '../schema';

export const useUpdateMyBookReviewForm = (
  initialValue?: UpdateMyBookReviewType
) =>
  useFormWithSchema(updateMyBookReviewSchema, {
    defaultValues: initialValue ?? DEFAULT_UPDATE_MY_BOOK_REVIEW,
  });