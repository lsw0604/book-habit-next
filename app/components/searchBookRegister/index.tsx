'use client';

import { FormEvent, ReactNode } from 'react';
import styled from 'styled-components';

import Button from 'components/common/button';

import useToastHook from '@/hooks/useToastHook';
import { RootState, useAppSelector } from '@/app/store';
import useBookRegisterMutation from '@/queries/book/useBookRegisterMutation';

const Container = styled.form`
  position: relative;
`;

export default function SearchBookRegister({
  children,
}: {
  children: ReactNode;
}) {
  const { addToast } = useToastHook();
  const { authors, ...rest } = useAppSelector(
    (state: RootState) => state.searchBookRegister
  );
  const { isLogged } = useAppSelector((state: RootState) => state.user);
  const { mutate, isLoading } = useBookRegisterMutation();

  const registerBody: BookRegisterType = {
    authors: authors.join(','),
    ...rest,
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isLogged)
      return addToast({ message: '로그인 해주세요.', status: 'info' });
    mutate(registerBody);
  };

  return (
    <Container onSubmit={onSubmit}>
      {children}
      <Button type="submit" isLoading={isLoading}>
        추가하기
      </Button>
    </Container>
  );
}
