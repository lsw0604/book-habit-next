'use client';

import styled from 'styled-components';
import { useState, ChangeEvent, FormEvent } from 'react';

import Input from 'components/common/input';
import Divider from 'components/common/Divider';
import Button from 'components/common/button';
import KakaoButton from 'components/common/button/KakaoButton';
import { IconClosedEye, IconOpenEye, IconMail } from 'style/icon';
import { customize } from 'style/colors';
import useLocalLoginMutation from 'queries/local/useLocalLoginMutation';
import useValidateHook from '@/hooks/useValidateHook';
import Link from 'next/link';
import useToastHook from '@/hooks/useToastHook';

const Container = styled.form`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  max-width: 375px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;
  border-radius: 1rem;
  @media screen and (min-width: 1280px) {
    padding: 2rem;
    max-width: 500px;
    border-radius: 10px;
  }
`;

const Stack = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 8px;
`;

const Footer = styled.p`
  color: ${customize.gray['400']};
  font-size: 12px;
  margin: 0 0 0 10px;
  span {
    margin-left: 10px;
    cursor: pointer;
    color: ${({ theme }) => theme.colors.sub};
  }
`;

export default function LoginForm() {
  const { addToast } = useToastHook();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [useValidation, setUseValidation] = useState<boolean>(false);
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);

  const { isLoading, mutate } = useLocalLoginMutation();

  const onChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const toggleIcon = () => {
    setEyeOpen((prev) => !prev);
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUseValidation(true);

    if (!email || !password)
      return addToast({
        message: '이메일 및 비밀번호를 입력해주세요.',
        status: 'error',
      });

    mutate({ email, password });
  };

  return (
    <Container onSubmit={onSubmit}>
      <Stack>
        <Input
          label="이메일"
          icon={<IconMail />}
          type="email"
          value={email}
          onChange={onChangeEmail}
          useValidation={useValidation}
          isValid={!email}
          errorMessage="이메일이 필요합니다."
        />
      </Stack>
      <Stack>
        <Input
          label="비밀번호"
          icon={
            eyeOpen ? (
              <IconOpenEye onClick={toggleIcon} />
            ) : (
              <IconClosedEye onClick={toggleIcon} />
            )
          }
          type={eyeOpen ? 'text' : 'password'}
          autoComplete="off"
          value={password}
          onChange={onChangePassword}
          useValidation={useValidation}
          isValid={!password}
          errorMessage="비밀번호가 필요합니다."
        />
      </Stack>
      <Footer>
        계정이 없나요 ?{' '}
        <Link href="/register">
          <span>회원가입</span>
        </Link>
      </Footer>
      <Divider divider={10} />
      <Stack style={{ marginBottom: '0px' }}>
        <Button
          type="submit"
          isLoading={isLoading}
          style={{ marginBottom: '8px' }}
        >
          로그인
        </Button>
      </Stack>
      <Stack>
        <KakaoButton />
      </Stack>
    </Container>
  );
}
