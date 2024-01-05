'use client';

import { useState } from 'react';
import styled from 'styled-components';

import { customize } from '@/style/colors';

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

const Header = styled.h1`
  margin-bottom: 16px;
  text-align: center;
  font-size: 28px;
  line-height: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.sub};
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

export default function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [useValidation, setUseValidation] = useState<boolean>(false);
  const [eyeOpen, setEyeOpen] = useState<boolean>(false);

  return <Container>page</Container>;
}
