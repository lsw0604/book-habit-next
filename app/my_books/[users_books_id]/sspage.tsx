'use client';

import styled, { css } from 'styled-components';

import Calendar from 'components/common/calendar';
import MyBookDetailInfoBox from 'components/myBookDetail/MyBookDetailInfoBox';
import MyBookDetailCommentList from 'components/myBookDetail/MyBookDetailCommentList';

const WRAPPER_MEDIA_CSS_OBJ = {
  info: css`
    @media screen and (min-width: 1280px) {
      grid-area: 1 / 1 / 7 / 3;
    }
  `,
  calendar: css`
    @media screen and (min-width: 1280px) {
      grid-area: 1 / 3 / 20 / 6;
    }
  `,
  comment: css`
    @media screen and (min-width: 1280px) {
      grid-area: 7 / 1 / 20 / 3;
    }
  `,
};

const BOX_CSS_OBJ = {
  info: css`
    padding: 1rem 0;
  `,
  calendar: css`
    padding: 1rem;
  `,
  comment: css`
    padding: 1rem 0;
  `,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: scroll;

  @media screen and (min-width: 1280px) {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(19, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
`;

const Wrapper = styled.div<{ $mode: 'info' | 'calendar' | 'comment' }>`
  padding: 1rem;
  ${({ $mode }) => WRAPPER_MEDIA_CSS_OBJ[$mode]}
`;

const Box = styled.div<{ $mode: 'info' | 'calendar' | 'comment' }>`
  height: 100%;
  width: 100%;
  border-radius: 1rem;
  display: flex;
  ${({ $mode }) => BOX_CSS_OBJ[$mode]};
  box-shadow: ${({ theme }) => theme.shadow.md};
  background-color: ${({ theme }) => theme.mode.sub};
`;

export default function page({
  params,
}: {
  params: { users_books_id: number };
}) {
  const { users_books_id } = params;
  return (
    <Container>
      <Wrapper $mode="info">
        <Box $mode="info">
          <MyBookDetailInfoBox users_books_id={users_books_id} />
        </Box>
      </Wrapper>
      <Wrapper $mode="calendar">
        <Box $mode="calendar">
          <Calendar users_books_id={users_books_id} />
        </Box>
      </Wrapper>
      <Wrapper $mode="comment">
        <Box $mode="comment">
          <MyBookDetailCommentList users_books_id={users_books_id} />
        </Box>
      </Wrapper>
    </Container>
  );
}
