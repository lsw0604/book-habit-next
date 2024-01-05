'use client';

import styled from 'styled-components';
import Link from 'next/link';

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

const DROPDOWN_OPTIONS = [
  {
    label: '회원가입',
    url: '/register',
  },
  {
    label: '로그인',
    url: '/login',
  },
];

export default function HeaderAuth() {
  return (
    <Container>
      {DROPDOWN_OPTIONS.map((option) => (
        <Wrapper key={option.label}>
          <Link href={option.url}>
            <Button>{option.label}</Button>
          </Link>
        </Wrapper>
      ))}
    </Container>
  );
}
