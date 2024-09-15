'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { MailIcon, UserIcon, LockIcon } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import RegisterRadioGroup from './register-radio-group';
import RegisterPasswordInput from './register-password-input';

import { schema, InputType } from './type';
import useLocalRegisterMutation from '@/queries/local/useLocalRegisterMutation';

export default function RegisterForm() {
  const [useValidation, setIsUseValidation] = useState<boolean>(false);

  const {
    register,
    formState: { errors, isSubmitted, isValid },
    handleSubmit,
  } = useForm<InputType>({
    resolver: zodResolver(schema),
  });

  // const { mutate, isLoading } = useLocalRegisterMutation();

  const onSubmit = (data: InputType) => {
    const { confirm, ...rest } = data;

    // mutate({ ...rest });
  };

  // useUpdateEffect(() => {
  //   if (isSubmitted) {
  //     setIsUseValidation(true);
  //   }
  // }, [isSubmitted]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col ml-auto max-w-sm p-4 w-full rounded-lg"
    >
      <div className="w-full relative mb-2">
        <Input
          label="아이디"
          icon={<MailIcon className="w-5 h-5" />}
          useValidation={useValidation}
          isValid={!isValid}
          errorMessage={errors.email?.message}
          {...register('email')}
        />
      </div>
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
        <Input
          label="비밀번호 확인"
          icon={<LockIcon className="w-5 h-5" />}
          useValidation={useValidation}
          isValid={!isValid}
          errorMessage={errors.confirm?.message}
          {...register('confirm')}
        />
      </div>
      <div className="w-full relative mb-2">
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
      <div className="w-full relative mb-2 h-auto">
        <RegisterRadioGroup
          errorMessage={errors.gender?.message}
          isValid={!isValid}
          useValidation={useValidation}
          register={{ ...register('gender') }}
        />
      </div>
      <Separator className="my-4" />
      <Button type="submit">회원가입</Button>
    </form>
  );
}
