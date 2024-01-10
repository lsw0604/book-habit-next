'use client';

import styled from 'styled-components';
import RegisterForm from 'components/register';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const Header = styled.h1`
  margin: 16px 0;
  text-align: center;
  font-size: 28px;
  line-height: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.sub};
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export default function RegisterPage() {
  return (
    <Container>
      <Header>회원가입</Header>
      <Wrapper>
        <RegisterForm />
      </Wrapper>
    </Container>
  );
}
