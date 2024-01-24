'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdateEffect } from 'usehooks-ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUp01Icon, UserIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import RegisterRadioGroup from '../../_components/register-radio-group';

import { schema, InputType } from './type';
import useKakaoRegisterMutation from '@/queries/kakao/useKakaoRegisterMutation';

export default function KakaoRegisterForm() {
  const [useValidation, setUseValidation] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isValid, isSubmitted },
  } = useForm<InputType>({
    resolver: zodResolver(schema),
  });

  const { mutate, isLoading } = useKakaoRegisterMutation();

  const onSubmit = (data: InputType) => {
    mutate(data);
  };

  useUpdateEffect(() => {
    if (isSubmitted) {
      setUseValidation(true);
    }
  }, [isSubmitted]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col ml-auto max-w-sm p-4 w-full rounded-lg"
    >
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
        <Input
          type="number"
          autoComplete="off"
          useValidation={useValidation}
          label="나이"
          isValid={!isValid}
          icon={<ArrowUp01Icon className="w-5 h-5" />}
          {...register('age')}
          errorMessage={errors.age?.message}
        />
      </div>
      <div className="w-full relative mb-2">
        <RegisterRadioGroup
          errorMessage={errors.gender?.message}
          isValid={!isValid}
          useValidation={useValidation}
          register={{ ...register('gender') }}
        />
      </div>
      <Separator className="my-4" />
      <Button isLoading={isLoading} type="submit">
        등록하기
      </Button>
    </form>
  );
}
