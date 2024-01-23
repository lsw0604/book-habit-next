'use client';

import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateEffect } from 'usehooks-ts';
import { MailIcon, UserIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import RegisterRadioGroup from './register-radio-group';
import RegisterPasswordInput from './register-password-input';

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
  password: passwordSchema,
  confirm: passwordSchema,
  gender: z.enum(['male', 'female'], {
    invalid_type_error: '성별을 선택해주세요.',
  }),
  age: z.string().refine((value) => !isNaN(parseInt(value)), {
    message: '숫자를 입력해주세요.',
  }),
});

type InputType = z.infer<typeof schema>;

export default function RegisterForm() {
  const {
    register,
    formState: { errors, isSubmitted, isValid },
    handleSubmit,
  } = useForm<InputType>({
    resolver: zodResolver(schema),
  });
  const [useValidation, setIsUseValidation] = useState<boolean>(false);

  const onSubmit = (data: InputType) => {
    const { password, email, name, age, gender } = data;
    console.log({
      password,
      email,
      name,
      age: parseInt(age),
      gender,
    });
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
      <Input
        label="아이디"
        icon={<MailIcon className="w-5 h-5" />}
        useValidation={useValidation}
        isValid={!isValid}
        errorMessage={errors.email?.message}
        {...register('email')}
      />

      <div className="w-full relative mb-2"></div>
      <div className="w-full relative mb-2">
        <Input
          label="이름"
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
          label="비밀번호"
          useValidation={useValidation}
          isValid={!isValid}
          errorMessage={errors.password?.message}
          register={{ ...register('password') }}
        />
      </div>
      <div className="w-full relative mb-2">
        <RegisterPasswordInput
          label="비밀번호 확인"
          useValidation={useValidation}
          isValid={!isValid}
          errorMessage={errors.confirm?.message}
          register={{ ...register('confirm') }}
        />
      </div>

      <div className="w-full relative mb-2 h-auto">
        <RegisterRadioGroup
          errorMessage={errors.gender?.message}
          isValid={!isValid}
          useValidation={useValidation}
          register={{ ...register('gender') }}
        />
      </div>
      <div className="w-full relative mb-2">
        {/* <input type="number" {...register('age')} /> */}
        <Input
          type="number"
          autoComplete="off"
          useValidation={useValidation}
          label="나이"
          isValid={!isValid}
          {...register('age')}
          errorMessage={errors.age?.message}
        />
      </div>
      <button type="submit"> submit</button>
    </form>
  );
}
