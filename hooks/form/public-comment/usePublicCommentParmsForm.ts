import useFormWithSchema from '../useFormWithSchema';
import { defaultPublicCommentValue } from './default/params';
import {
  publicCommentParamsSchema,
  publicCommentParamsSchemaType,
} from './schema/params.schema';

const usePublicCommentParamsForm = (
  initialValue?: publicCommentParamsSchemaType
) =>
  useFormWithSchema(
    publicCommentParamsSchema,
    initialValue ?? defaultPublicCommentValue
  );

export default usePublicCommentParamsForm;
