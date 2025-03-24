'use client';

import type { AuthRegisterType } from '@/schemas/auth/register';
import type { ResponseAuth } from '@/service/api/auth/types';
import React, { useCallback, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  MailIcon,
  UserIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from 'lucide-react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ErrorMessage } from '@/components/common/error-message';
import { InputDatePicker } from '@/components/common/date-picker';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { IconFemale, IconMale } from '@/style/icon';

import { useAppDispatch } from '@/store';
import { userActions } from '@/store/features/user/user-action';

import useLoginRouter from '@/hooks/auth/useLoginRouter';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import useRegisterForm from '@/hooks/auth/useRegisterForm';
import useSuccessHandler from '@/hooks/success/useSuccessHandler';
import { useAuthMutation } from '@/hooks/auth/useAuthQueries';

export default function RegisterForm() {
  const dispatch = useAppDispatch();
  const { onSuccessCallback } = useLoginRouter();
  const { control, handleSubmit } = useRegisterForm();
  const {
    register: { mutate, isSuccess, error, isPending, isError },
  } = useAuthMutation();

  const handleSuccess = (response: ResponseAuth) => {
    dispatch(userActions.setUserState({ ...response, isLogged: true }));
    onSuccessCallback();
  };

  useSuccessHandler({ isSuccess, message: '회원가입에 성공했습니다.' });
  useErrorHandler(isError, error);

  const onSubmit = (data: AuthRegisterType) => {
    const { checkPassword: _, ...rest } = data;
    mutate(
      { ...rest },
      {
        onSuccess: handleSuccess,
      }
    );
  };

  return (
    <form
      className="flex flex-col max-w-sm p-4 w-full rounded-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <EmailController control={control} />
      <NameController control={control} />
      <BirthdayController control={control} />
      <PasswordController control={control} />
      <CheckPasswordController control={control} />
      <GenderController control={control} />
      <Separator className="my-4" />
      <Button isLoading={isPending} type="submit">
        회원가입
      </Button>
    </form>
  );
}

interface ControllerProps {
  control: Control<AuthRegisterType>;
}

const EmailController: React.FC<ControllerProps> = ({ control }) => {
  return (
    <Controller
      name="email"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full relative mb-2">
          <Label>이메일</Label>
          <Input
            {...field}
            autoComplete="off"
            icon={<MailIcon className="w-5 h-5" />}
          />
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
      )}
    />
  );
};

const NameController: React.FC<ControllerProps> = ({ control }) => {
  return (
    <Controller
      name="name"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full relative mb-2">
          <Label>이름</Label>
          <Input
            {...field}
            autoComplete="off"
            icon={<UserIcon className="w-5 h-5" />}
          />
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
      )}
    />
  );
};

const PasswordController: React.FC<ControllerProps> = ({ control }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const passwordHandler = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  return (
    <Controller
      name="password"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full relative mb-2">
          <Label>비밀번호</Label>
          <Input
            {...field}
            autoComplete="off"
            type={isOpen ? 'text' : 'password'}
            icon={
              isOpen ? (
                <EyeIcon className="w-5 h-5" onClick={passwordHandler} />
              ) : (
                <EyeOffIcon className="w-5 h-5" onClick={passwordHandler} />
              )
            }
          />
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
      )}
    />
  );
};

const CheckPasswordController: React.FC<ControllerProps> = ({ control }) => {
  return (
    <Controller
      name="checkPassword"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="w-full relative mb-2">
          <Label>비밀번호 확인</Label>
          <Input
            {...field}
            type="password"
            autoComplete="off"
            icon={<LockIcon className="w-5 h-5" />}
          />
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
      )}
    />
  );
};

const GenderController: React.FC<ControllerProps> = ({ control }) => {
  return (
    <Controller
      name="gender"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="w-full relative mb-2">
          <Label>성별</Label>
          <RadioGroup
            className="flex gap-2 my-2"
            value={value}
            onValueChange={onChange}
          >
            <div className="w-full flex gap-2 justify-center">
              <RadioGroupItem className="mr-2" value="MALE" id="MALE" />
              <IconMale className="w-5 h-5" />
              <Label htmlFor="MALE">남성</Label>
            </div>
            <div className="w-full flex gap-2 justify-center">
              <RadioGroupItem className="mr-2" value="FEMALE" id="FEMALE" />
              <IconFemale className="w-5 h-5" />
              <Label htmlFor="FEMALE">여성</Label>
            </div>
          </RadioGroup>
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
      )}
    />
  );
};

const BirthdayController: React.FC<ControllerProps> = ({ control }) => {
  return (
    <Controller
      name="birthday"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => {
        return (
          <div className="w-full relative mb-2">
            <Label>생년월일</Label>
            <InputDatePicker
              className="border-slate-500 border-2"
              value={value}
              onChange={onChange}
            />
            {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
          </div>
        );
      }}
    />
  );
};
