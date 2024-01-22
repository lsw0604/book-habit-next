'use client';

import styled from 'styled-components';

import LoginForm from 'components/login';

const Header = styled.h1`
  margin: 16px 0;
  text-align: center;
  font-size: 28px;
  line-height: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.sub};
`;

export default function LoginPage() {
  return (
    <>
      <h1 className="text-center text-lg">로그인</h1>
      <LoginForm />
    </>
  );
}
