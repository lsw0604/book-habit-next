import { z } from 'zod';

export type MyBookCommentSchemaType = z.infer<typeof myBookCommentSchema>;

export const defaultMyBookCommentValues: MyBookCommentSchemaType = {
  isPublic: false,
  comment: '',
};

export const myBookCommentSchema = z.object({
  isPublic: z.boolean({ message: 'isPublic은 필수 입니다.' }),
  comment: z.string().min(1, { message: '최소 1글자 이상 입력해주세요.' }),
});
