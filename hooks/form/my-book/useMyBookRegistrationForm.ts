import useFormWithSchema from '../useFormWithSchema';
import { defaultMyBookRegistrationValue } from './default/registration';
import {
  myBookRegistrationSchema,
  MyBookRegistrationSchemaType,
} from './schema/registration.schema';

const useMyBookRegistrationForm = (
  initialValue?: MyBookRegistrationSchemaType
) =>
  useFormWithSchema(
    myBookRegistrationSchema,
    initialValue ?? defaultMyBookRegistrationValue
  );

export default useMyBookRegistrationForm;
