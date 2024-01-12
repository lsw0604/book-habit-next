'use client';

import styled from 'styled-components';

import CommentsItem from 'components/comments/CommentsItem';
import CommentsEmpty from 'components/comments/CommentsEmpty';
import useCommentsListQuery from '@/queries/comments/useCommentsListQuery';

interface IProps {
  filter?: string[];
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

export default function CommentsList({ filter }: IProps) {
  const { data } = useCommentsListQuery(filter);

  if (!data) return <CommentsEmpty />;

  return (
    <Container>
      {data?.comments.map((comment) => (
        <CommentsItem comment={comment} key={comment.comment_id} />
      ))}
    </Container>
  );
}
