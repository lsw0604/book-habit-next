'use client';

import styled from 'styled-components';
import { Dispatch, SetStateAction } from 'react';

import IconButton from 'components/common/button/IconButton';
import { IconLeftArrow, IconRightArrow } from 'style/icon';

interface IProps {
  totalPage: number;
  page: number;
  nextPage?: number;
  prevPage?: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const Container = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const PaginationNumberContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const PaginationNumber = styled.p<{ $isFocus: boolean }>`
  line-height: 40px;
  font-size: 20x;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $isFocus, theme }) =>
    $isFocus ? theme.colors.spinner : theme.mode.typo_sub};
`;

export default function Pagination({
  totalPage,
  page,
  setPage,
  nextPage,
  prevPage,
}: IProps) {
  const nextPageHandler = () => {
    if (nextPage && page < nextPage) {
      setPage(nextPage);
    }
  };

  const prevPageHandler = () => {
    if (prevPage && page > prevPage) {
      setPage(prevPage);
    }
  };

  const pageHandler = (toPage: number) => {
    if (page !== toPage) {
      setPage(toPage);
    }
  };

  return (
    <Container>
      <IconButton icon={<IconLeftArrow />} onClick={prevPageHandler}>
        prev
      </IconButton>
      <PaginationNumberContainer>
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((a) => (
          <PaginationNumber
            onClick={() => pageHandler(a)}
            key={a}
            $isFocus={a === page}
          >
            {a}
          </PaginationNumber>
        ))}
      </PaginationNumberContainer>
      <IconButton icon={<IconRightArrow />} onClick={nextPageHandler}>
        next
      </IconButton>
    </Container>
  );
}
