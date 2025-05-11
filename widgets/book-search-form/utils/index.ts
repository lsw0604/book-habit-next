import { FormState } from 'react-hook-form';
import { BookSearchParamsType } from '@/features/book-search/model/schema';

export const hasFormErrors = (
  formState: FormState<BookSearchParamsType>
): boolean => {
  const { errors, isSubmitted } = formState;

  if (!isSubmitted) return false;

  return !!(
    errors.query?.message ||
    errors.size?.message ||
    errors.sort?.message ||
    errors.target?.message
  );
};
