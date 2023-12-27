'use client';

import dayjs from 'dayjs';
import styled from 'styled-components';

import { LogoSad } from 'style/icon';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  @media screen and (min-width: 1280px) {
    padding: 1rem 30%;
  }
`;

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    width: 40%;
    opacity: 0.4;
  }
`;

const Message = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const MONTH = parseInt(dayjs().format('MM'));

export default function CommentsEmpty() {
  return (
    <Container>
      <Background>
        <LogoSad />
        <Message>{MONTH}월에 등록된 한줄평이 없습니다.</Message>
      </Background>
    </Container>
  );
}
