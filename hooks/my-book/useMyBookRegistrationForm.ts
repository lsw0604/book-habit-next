import {
  DEFAULT_MY_BOOK_REGISTRATION,
  MyBookRegistrationType,
  myBookRegistrationSchema,
} from '@/schemas/my-book/registration';
import useFormWithSchema from '../form/useFormWithSchema';

const useMyBookRegistrationForm = (initialValue?: MyBookRegistrationType) =>
  useFormWithSchema(
    myBookRegistrationSchema,
    initialValue ?? DEFAULT_MY_BOOK_REGISTRATION
  );

export default useMyBookRegistrationForm;
