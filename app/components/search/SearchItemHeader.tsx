'use client';

import styled from 'styled-components';
import { v4 } from 'uuid';

interface IProps {
  title: string;
  query: string;
}

const Container = styled.div`
  width: 100%;
  font-size: 18px;
  line-height: 20px;
  margin-bottom: 8px;
  float: left;
  text-align: start;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: ${({ theme }) => theme.mode.typo_sub};
`;

const Highlighted = styled.div`
  color: ${({ theme }) => theme.colors.main};
  display: inline-flex;
`;

export default function SearchItemHeader({ title, query }: IProps) {
  const regExp = new RegExp(`(${query})`, 'gi');

  if (query !== '' && title.includes(query)) {
    const splitTitle = title.split(regExp);

    return (
      <Container>
        {splitTitle.map((word) =>
          regExp.test(word) ? (
            <Highlighted key={v4()}>{word}</Highlighted>
          ) : (
            word
          )
        )}
      </Container>
    );
  }

  return <Container>{title}</Container>;
}
