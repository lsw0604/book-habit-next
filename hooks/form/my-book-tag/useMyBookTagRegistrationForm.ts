import useFormWithSchema from '../useFormWithSchema';
import { defaultMyBookTagRegistrationValue } from './default/registration';
import {
  myBookTagRegistrationSchema,
  MyBookTagRegistrationSchemaType,
} from './schema/registration.schema';

const useMyBookTagRegistrationForm = (
  initialValue?: MyBookTagRegistrationSchemaType
) =>
  useFormWithSchema(
    myBookTagRegistrationSchema,
    initialValue ?? defaultMyBookTagRegistrationValue
  );

export default useMyBookTagRegistrationForm;
