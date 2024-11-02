import useFormWithSchema from '../useFormWithSchema';
import { defaultMyBookCommentUpdateValue } from './default/update';
import {
  myBookCommentUpdateSchema,
  MyBookCommentUpdateSchemaType,
} from './schema/update.schema';

const useMyBookCommentUpdateForm = (
  initialValue?: MyBookCommentUpdateSchemaType
) =>
  useFormWithSchema(
    myBookCommentUpdateSchema,
    initialValue ?? defaultMyBookCommentUpdateValue
  );

export default useMyBookCommentUpdateForm;
