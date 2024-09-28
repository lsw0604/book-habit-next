import { z } from 'zod';

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const defaultLoginValues: LoginSchemaType = {
  email: '',
  password: '',
};

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'email을 입력해주세요.',
    })
    .email({
      message: '유효한 email을 입력해주세요.',
    }),
  password: z.string().min(1, {
    message: 'password를 입력해주세요.',
  }),
});
