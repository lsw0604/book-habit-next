import { z } from 'zod';

export type AuthRegisterType = z.infer<typeof authRegisterSchema>;

export const authRegisterSchema = z
  .object({
    email: z.string().email('이메일 형식이 올바르지 않습니다.'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상이어야 합니다.')
      .superRefine((value, ctx) => {
        if (!/[0-9]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '비밀번호에는 최소 하나의 숫자가 포함되어야 합니다.',
          });
        }

        if (!/[a-zA-Z]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '비밀번호에는 최소 하나의 영어 문자가 포함되어야 합니다.',
          });
        }

        if (!/[!@#$%^&*(),.?:{}|<>]/.test(value)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: '비밀번호에는 최소 하나의 특수 문자가 포함되어야 합니다.',
          });
        }
      }),
    checkPassword: z.string().min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
    name: z.string().min(2, '이름은 최소 2자 이상이어야 합니다.'),
    gender: z.enum(['MALE', 'FEMALE'], {
      message: '성별은 남자 또는 여자여야 합니다.',
    }),
    birthday: z
      .date()
      .refine(date => !isNaN(date.getTime()), '올바른 생년월일을 입력해주세요.')
      .optional(),
  })
  .refine(data => data.password === data.checkPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['checkPassword'],
  });

export const DEFAULT_AUTH_REGISTER: AuthRegisterType = {
  email: '',
  password: '',
  name: '',
  gender: 'MALE',
  birthday: undefined,
  checkPassword: '',
};
