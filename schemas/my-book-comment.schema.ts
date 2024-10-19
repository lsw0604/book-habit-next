import { z } from 'zod';

export type MyBookCommentSchemaType = z.infer<typeof myBookCommentSchema>;
export type MyBookCommentUpdateSchemaType = z.infer<
  typeof myBookCommentUpdateSchema
>;

export const defaultMyBookCommentValues: MyBookCommentSchemaType = {
  isPublic: false,
  comment: '',
};

export const defaultMyBookCommentUpdateValues: MyBookCommentUpdateSchemaType = {
  id: 0,
  isPublic: false,
  comment: '',
};

export const myBookCommentSchema = z.object({
  isPublic: z.boolean({ message: 'isPublic은 필수 입니다.' }),
  comment: z.string().min(1, { message: '최소 1글자 이상 입력해주세요.' }),
});

export const myBookCommentUpdateSchema = z.object({
  id: z.number({ message: 'commentId는 필수 입니다.' }),
  isPublic: z.boolean({ message: 'isPublic은 필수 입니다.' }),
  comment: z
    .string()
    .min(1, { message: '최소 1글자 이상 입력해주세요.' })
    .optional(),
});
