'use client';

import styled from 'styled-components';

import CommentDetail from 'components/commentDetail';
import CommentDetailReplyList from 'components/commentDetail/CommentDetailReplyList';
import CommentDetailReplyForm from 'components/commentDetail/CommentDetailReplyForm';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  box-sizing: border-box;
  overflow: scroll;

  @media screen and (min-width: 768px) {
    padding: 1rem 15%;
  }
`;

const ReplyContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadow.md};
  background-color: ${({ theme }) => theme.mode.sub};
`;

export default function CommentDetailPage({
  params,
}: {
  params: { comment_id: number };
}) {
  const { comment_id } = params;

  return (
    <Container>
      <CommentDetail comment_id={comment_id} />
      <ReplyContainer>
        <CommentDetailReplyList comment_id={comment_id} />
        <CommentDetailReplyForm comment_id={comment_id} />
      </ReplyContainer>
    </Container>
  );
}
