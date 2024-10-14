import { z } from 'zod';

export type MyBookCommentSchemaType = z.infer<typeof myBookCommentSchema>;

export const defaultMyBookCommentValues: MyBookCommentSchemaType = {
  myBookId: 0,
  isPublic: false,
  comment: '',
};

export const myBookCommentSchema = z.object({
  myBookId: z.number({ message: 'myBookId는 필수 입니다.' }),
  isPublic: z.boolean({ message: 'isPublic은 필수 입니다.' }),
  comment: z.string().min(1, { message: '최소 1글자 이상 입력해주세요.' }),
});
