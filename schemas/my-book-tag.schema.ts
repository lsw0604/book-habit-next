import { z } from 'zod';

export type MyBookTagSchemaType = z.infer<typeof myBookTagSchema>;

export const defaultMyBookTagValues: MyBookTagSchemaType = {
  tag: '',
};

export const myBookTagSchema = z.object({
  tag: z.string().min(1, { message: '태그는 최소 1글자 이상 입력해주세요.' }),
});
