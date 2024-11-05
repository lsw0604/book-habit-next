import { z } from 'zod';

export type MyBookTagRegistrationSchemaType = z.infer<
  typeof myBookTagRegistrationSchema
>;

export const myBookTagRegistrationSchema = z.object({
  tag: z.string().min(1, { message: '태그는 최소 1글자 이상 입력해주세요.' }),
});
