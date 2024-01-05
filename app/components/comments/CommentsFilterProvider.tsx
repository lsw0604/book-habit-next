'use client';

import styled from 'styled-components';

import CommentsList from 'components/comments/CommentsList';
import CommentsEmpty from 'components/comments/CommentsEmpty';
import CommentsHashTag from 'components/comments/CommentsHashTag';

import useCommentsListQuery from 'queries/comments/useCommentsListQuery';
import useCommentsFilterHook from '@/hooks/useCommentsFilterHook';

interface IProps {
  children: JSX.Element;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  @media screen and (min-width: 768px) {
    padding: 1rem 15%;
  }
`;

const Header = styled.div`
  padding: 0 1rem;
  height: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 1rem;
`;

export default function CommentsFilterProvider({ children }: IProps) {
  const { filter, addFilter, removeFilter } = useCommentsFilterHook();
  const { data } = useCommentsListQuery(filter);

  return (
    <Container>
      <Header>
        {children}
        <CommentsHashTag
          filter={filter}
          addFilter={addFilter}
          removeFilter={removeFilter}
        />
      </Header>
      <CommentsList data={data} />
    </Container>
  );
}
