import useFormWithSchema from '../useFormWithSchema';
import { defaultPublicCommentValue } from './default/params';
import {
  publicCommentParamsSchema,
  PublicCommentParamsSchemaType,
} from './schema/params.schema';

const usePublicCommentParamsForm = (
  initialValue?: PublicCommentParamsSchemaType
) =>
  useFormWithSchema(
    publicCommentParamsSchema,
    initialValue ?? defaultPublicCommentValue
  );

export default usePublicCommentParamsForm;
