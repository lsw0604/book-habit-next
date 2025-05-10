import { FormState } from 'react-hook-form';
import { BookSearchParamsType } from '@/features/book-search/model/schema';

export const hasFormErrors = (
  formState: FormState<BookSearchParamsType>
): boolean => {
  const { errors } = formState;
  return !!(
    errors.query?.message ||
    errors.size?.message ||
    errors.sort?.message ||
    errors.target?.message
  );
};

export const getFormKey = (): number => {
  return Date.now();
};
