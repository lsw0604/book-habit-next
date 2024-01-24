import { z } from 'zod';

const passwordSchema = z
  .string()
  .min(8, {
    message: '비밀번호는 최소 8자 이상 입력해주세요.',
  })
  .refine(
    (val) =>
      /[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/g.test(val) && /[0-9]/g.test(val),
    {
      message: '비밀번호에는 숫자와 특수 문자가 포함되어야 합니다.',
    }
  );

export const schema = z
  .object({
    email: z.string().email({
      message: '유효한 이메일을 입력해주세요.',
    }),
    name: z.string().min(1, {
      message: '이름을 입력해주세요.',
    }),
    password: passwordSchema,
    confirm: z.string(),
    gender: z.enum(['male', 'female'], {
      invalid_type_error: '성별을 선택해주세요.',
    }),
    age: z
      .string()
      .min(1, {
        message: '숫자를 입력해주세요.',
      })
      .refine((value) => !isNaN(parseInt(value)), {
        message: '숫자를 입력해주세요.',
      })
      .transform((value) => parseInt(value)),
  })
  .refine((data) => data.password === data.confirm, {
    message: '비밀번호가 같지 않습니다.',
    path: ['confirm'],
  })
  .refine(
    (data) =>
      !data.password.includes(data.name) &&
      !data.password.includes(data.email.split('@')[0]),
    {
      message: '비밀번호에 아이디나 이름이 포함되어서는 안됩니다.',
      path: ['password'],
    }
  );

export type InputType = z.infer<typeof schema>;
