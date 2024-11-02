import useFormWithSchema from '../useFormWithSchema';
import { defaultMyBookCommentRegistrationValue } from './default/registration';
import {
  myBookCommentRegistrationSchema,
  MyBookCommentRegistrationSchemaType,
} from './schema/registration.schema';

const useMyBookCommentRegistrationForm = (
  initialValue?: MyBookCommentRegistrationSchemaType
) =>
  useFormWithSchema(
    myBookCommentRegistrationSchema,
    initialValue ?? defaultMyBookCommentRegistrationValue
  );

export default useMyBookCommentRegistrationForm;
