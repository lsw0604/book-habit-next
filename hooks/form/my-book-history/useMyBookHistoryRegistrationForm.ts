import useFormWithSchema from '../useFormWithSchema';
import { defaultMyBookHistoryRegistrationValue } from './default/registration';
import {
  myBookHistoryRegistrationSchema,
  MyBookHistoryRegistrationSchemaType,
} from './schema/registration.schema';

const useMyBookHistoryRegistrationForm = (
  initialValue?: MyBookHistoryRegistrationSchemaType
) =>
  useFormWithSchema(
    myBookHistoryRegistrationSchema,
    initialValue ?? defaultMyBookHistoryRegistrationValue
  );

export default useMyBookHistoryRegistrationForm;
