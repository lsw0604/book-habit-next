import { z } from 'zod';

export const authLoginSchema = z.object({
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

export type AuthLoginType = z.infer<typeof authLoginSchema>;

export const DEFAULT_AUTH_LOGIN: AuthLoginType = {
  email: '',
  password: '',
};
