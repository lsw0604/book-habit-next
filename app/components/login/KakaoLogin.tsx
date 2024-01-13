'use client';

import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import useKakaoCallbackQuery from 'queries/kakao/useKakaoCallbackQuery';
import Loader from 'components/common/Loader';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const ErrorWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.05);
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme }) => theme.mode.typo_sub};
  gap: 8px;
`;

const Span = styled.span`
  display: inline-flex;
  width: 100%;
  justify-content: center;
`;

const Number = styled.p`
  color: ${({ theme }) => theme.colors.spinner};
`;

export default function KakaoPage() {
  const [second, setSecond] = useState<number>(3);

  const router = useRouter();

  const code = new URLSearchParams(window.location.search).get(
    'code'
  ) as string;

  const { isLoading, isError, error, refetch } = useKakaoCallbackQuery(code);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecond((prev) => prev - 1);
      if (second === 1) {
        router.push('/');
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [second, setSecond]);

  if (!code) return router.push('/404');

  if (error) {
    return (
      <Container>
        <ErrorWrapper>
          <Span>로그인에 오류가 발생했습니다.</Span>
          <Span>
            <Number>{second}</Number>&nbsp;초 후에 홈페이지로 이동합니다.
          </Span>
        </ErrorWrapper>
      </Container>
    );
  }

  if (isLoading || isError) {
    return (
      <Container>
        <div className="error_page">
          <Loader size={2} />
        </div>
      </Container>
    );
  }
}
