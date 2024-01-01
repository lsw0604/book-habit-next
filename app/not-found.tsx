'use client';

import { LogoSad } from 'style/icon';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1rem;
  svg {
    width: 10rem;
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.md};
`;

const MessageContainer = styled.div`
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.spinner};
  font-size: 40px;
  line-height: 40px;
`;

const Message = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  line-height: 40px;
  font-size: 14px;
`;

const Link = styled.p`
  color: ${({ theme }) => theme.colors.spinner};
`;

export default function NotFound() {
  const router = useRouter();

  const navigateSearchPage = () => {
    router.push('/search');
  };

  return (
    <Container>
      <Content>
        <MessageContainer>
          <Title>404</Title>
          <Message>해당 페이지를 찾을 수 없습니다.</Message>
          <Link onClick={navigateSearchPage}>홈으로 가기</Link>
        </MessageContainer>
        <LogoSad />
      </Content>
    </Container>
  );
}
