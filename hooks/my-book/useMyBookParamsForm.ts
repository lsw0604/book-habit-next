import {
  myBookParamsSchema,
  MyBookParamsType,
  DEFAULT_MY_BOOK_PARAMS,
} from '@/schemas/my-book/params';
import useFormWithSchema from '../form/useFormWithSchema';

const useMyBookParamsForm = (initialValue: MyBookParamsType) =>
  useFormWithSchema(myBookParamsSchema, initialValue ?? DEFAULT_MY_BOOK_PARAMS);

export default useMyBookParamsForm;
