'use client';

import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Button from 'components/common/button';

const Container = styled.div`
  display: inline-flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: auto;
`;

export default function HeaderAuth() {
  const router = useRouter();

  const navigateRegister = () => {
    router.push('/register');
  };

  const navigateLogin = () => {
    router.push('/login');
  };

  const DROPDOWN_OPTIONS = [
    {
      label: '회원가입',
      onClick: navigateRegister,
    },
    {
      label: '로그인',
      onClick: navigateLogin,
    },
  ];

  return (
    <Container>
      {DROPDOWN_OPTIONS.map((option) => (
        <Wrapper key={option.label}>
          <Button onClick={option.onClick}>{option.label}</Button>
        </Wrapper>
      ))}
    </Container>
  );
}
