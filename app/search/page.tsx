'use client';

import styled from 'styled-components';

import SearchInput from 'components/search/SearchInput';
import SearchList from 'components/search/SearchList';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Contents = styled.div`
  width: 100%;
  height: 90%;
  overflow: scroll;
`;

export default function SearchPage() {
  return (
    <Container>
      <Wrapper>
        <SearchInput />
      </Wrapper>
      <Contents>
        <SearchList />
      </Contents>
    </Container>
  );
}
