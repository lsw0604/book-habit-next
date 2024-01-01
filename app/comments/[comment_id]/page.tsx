'use client';

import styled from 'styled-components';
import { useParams } from 'next/navigation';

import CommentDetailReplyList from 'components/commentDetail/CommentDetailReplyList';
import CommentDetailReplyForm from 'components/commentDetail/CommentDetailRepyForm';
import CommentDetail from 'components/commentDetail';
import Link from 'next/link';

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

export default function CommentDetailPage() {
  const { comment_id } = useParams();

  if (typeof comment_id !== 'string') return <Link href="404" />;

  const COMMENT_ID = parseInt(comment_id);

  return (
    <Container>
      <CommentDetail comment_id={COMMENT_ID} />
      <ReplyContainer>
        <Wrapper>
          <CommentDetailReplyList comment_id={COMMENT_ID} />
        </Wrapper>
        <CommentDetailReplyForm comment_id={COMMENT_ID} />
      </ReplyContainer>
    </Container>
  );
}
