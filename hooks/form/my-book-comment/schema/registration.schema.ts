import { z } from 'zod';

export type MyBookCommentRegistrationSchemaType = z.infer<
  typeof myBookCommentRegistrationSchema
>;

export const myBookCommentRegistrationSchema = z.object({
  isPublic: z.boolean({ message: 'isPublic은 필수 입니다.' }),
  comment: z
    .string()
    .min(1, { message: '최소 1글자 이상 입력해주세요.' })
    .max(300, { message: '최대 300글자 이하 입력해주세요.' }),
});
