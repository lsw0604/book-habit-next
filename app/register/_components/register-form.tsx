'use client';

import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateEffect } from 'usehooks-ts';
import { MailIcon, UserIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import RegisterPasswordInput from './register-password-input';
import ErrorMessage from '@/components/common/error-message';

import RegisterRadioGroup from './register-radio-group';

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

const schema = z.object({
  email: z.string().email({
    message: '유효한 이메일을 입력해주세요.',
  }),
  name: z.string().min(1, {
    message: '이름을 입력해주세요.',
  }),
  passwordForm: z
    .object({
      password: passwordSchema,
      confirm: passwordSchema,
    })
    .refine((data) => data.password !== data.confirm, {
      message: '비밀번호가 일치하지 않습니다.',
    }),
  gender: z.enum(['male', 'female']),
  age: z
    .number()
    .int({
      message: '숫자를 입력해주세요.',
    })
    .positive({ message: '양의 수를 입력해주세요.' }),
});

type InputType = z.infer<typeof schema>;

export default function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitted },
  } = useForm<InputType>({
    resolver: zodResolver(schema),
  });
  const [useValidation, setIsUseValidation] = useState<boolean>(false);

  const onSubmit = (data: InputType) => {
    console.log(data);
  };

  useUpdateEffect(() => {
    if (isSubmitted) {
      setIsUseValidation(true);
    }
  }, [isSubmitted]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full p-4 relative h-auto rounded-lg"
    >
      <div className="w-full relative mb-2">
        <Input
          label="email"
          icon={<MailIcon className="w-5 h-5" />}
          useValidation={useValidation}
          isValid={!isValid}
          errorMessage={errors.email?.message}
          {...register('email')}
        />
      </div>
      <div className="w-full relative mb-2">
        <Input
          label="name"
          type="text"
          icon={<UserIcon className="w-5 h-5" />}
          useValidation={useValidation}
          isValid={!isValid}
          errorMessage={errors.name?.message}
          {...register('name')}
        />
      </div>
      <div className="w-full relative mb-2">
        <RegisterPasswordInput
          label="password"
          useValidation={useValidation}
          isValid={!isValid}
          errorMessage={errors.passwordForm?.password?.message}
          register={{ ...register('passwordForm.password') }}
        />
      </div>
      <div className="w-full relative mb-2">
        <RegisterPasswordInput
          label="check password"
          useValidation={useValidation}
          isValid={!isValid}
          errorMessage={errors.passwordForm?.confirm?.message}
          register={{ ...register('passwordForm.confirm') }}
        />
      </div>
      <div>
        {errors.passwordForm && errors.passwordForm.message && (
          <ErrorMessage message={errors.passwordForm.message} />
        )}
      </div>
      <div className="w-full relative mb-2 h-10">
        <RegisterRadioGroup register={{ ...register('gender') }} />
      </div>
      <div className="w-full relative mb-2">
        <Input
          type="number"
          autoComplete="off"
          useValidation={useValidation}
          isValid={!isValid}
          errorMessage={errors.age?.message}
          {...register('age')}
        />
      </div>
      <button type="submit"> submit</button>
    </form>
  );
}
