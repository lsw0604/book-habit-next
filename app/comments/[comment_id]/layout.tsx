'use client';

import CommentDetailSkeleton from 'components/commentDetail/CommentDetailSkeleton';
import CommentDetailReplyForm from 'components/commentDetail/CommentDetailReplyForm';
import CommentDetailReplyList from 'components/commentDetail/CommentDetailReplyList';
import { ReactNode, Suspense } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 1rem;
  @media screen and (min-width: 768px) {
    padding: 1rem 15%;
  }
`;

const ReplyContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  background-color: ${({ theme }) => theme.mode.sub};
  box-shadow: ${({ theme }) => theme.shadow.md};
  border-radius: 1rem;
`;

const Wrapper = styled.div`
  height: 80%;
  position: relative;
  width: 100%;
  overflow: scroll;
  margin-bottom: 1rem;
`;

export default function CommentDetailLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { comment_id: number };
}) {
  const { comment_id } = params;

  return (
    <Container>
      {children}
      <ReplyContainer>
        <Wrapper>
          <CommentDetailReplyList comment_id={comment_id} />
          <CommentDetailReplyForm comment_id={comment_id} />
        </Wrapper>
      </ReplyContainer>
    </Container>
  );
}
