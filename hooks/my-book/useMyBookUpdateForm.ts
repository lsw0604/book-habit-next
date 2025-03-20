import useFormWithSchema from '../form/useFormWithSchema';
import {
  DEFAULT_MY_BOOK_UPDATE,
  MyBookUpdateType,
  myBookUpdateSchema,
} from '@/schemas/my-book/update';

const useMyBookUpdateForm = (initialValue?: MyBookUpdateType) =>
  useFormWithSchema(myBookUpdateSchema, initialValue ?? DEFAULT_MY_BOOK_UPDATE);

export default useMyBookUpdateForm;
