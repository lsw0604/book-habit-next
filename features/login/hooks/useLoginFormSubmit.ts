'use client'

import { useCallback } from "react";
import { useFormContext } from "react-hook-form";

import { User, userEvents } from "@/entities/user";
import { useLogin } from "./useLogin";
import { LoginType } from "../model";

export const useLoginFormSubmit = () => {
  const { isPending, isError, error, mutate } = useLogin();
  const { setError } = useFormContext<LoginType>();

  const onSuccess = useCallback((response: User) => {
    userEvents.emitLogin({ ...response });
  }, []);

  const onSubmit = useCallback(
    (data: LoginType) => {
      mutate({ ...data }, { onSuccess, onError: (error) => {
        if (error.statusCode === 401) {
          setError('password', {
            type: 'server',
            message: error.message,
          });
        } else if (error.statusCode === 404) {
          setError('email', {
            type: 'server',
            message: error.message,
          });
        } else {
          setError('root', {
            type: 'server',
            message: error.message || '로그인에 실패했습니다.',
          });
        }
      } });
    },
    [mutate, onSuccess]
  );

  return {
    onSubmit,
    isPending,
    isError,
    error,
  };
};