'use client';

import styled from 'styled-components';

import CommentsItem from 'components/comments/CommentsItem';
import CommentsEmpty from 'components/comments/CommentsEmpty';

interface IProps {
  data?: CommentsListQueryResponseType;
}

const Container = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow: auto;
  scroll-snap-type: y mandatory;
`;

export default function CommentsList({ data }: IProps) {
  if (!data) return <CommentsEmpty />;

  return (
    <Container>
      {data?.comments.map((comment) => (
        <CommentsItem comment={comment} key={comment.comment_id} />
      ))}
    </Container>
  );
}
