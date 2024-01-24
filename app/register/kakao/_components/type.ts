import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, {
    message: '이름을 입력해주세요.',
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
  gender: z.enum(['male', 'female'], {
    invalid_type_error: '성별을 선택해주세요.',
  }),
});

export type InputType = z.infer<typeof schema>;
