'use client';

import styled from 'styled-components';
import { useSearchParams } from 'next/navigation';
import { useRef } from 'react';
import { v4 } from 'uuid';

import Observer from 'components/common/Observer';
import SearchItem from 'components/search/SearchItem';
// import SearchLoader from 'components/Search/SearchLoader';
// import SearchSkeleton from 'components/Search/SearchSkeleton';
import useBookSearchInfinityQuery from 'queries/book/useBookSearchInfinityQuery';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: scroll;
`;

const Page = styled.div`
  padding: 0 1rem;
  width: 100%;
  gap: 1rem;
  :first-child {
    margin-top: 0px;
  }
  @media screen and (min-width: 360px) {
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
  }
  @media screen and (min-width: 1280px) {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1rem;
  }
`;

export default function SearchList() {
  const searchParams = useSearchParams();

  const keyword =
    searchParams.get('keyword') !== null ? searchParams.get('keyword') : null;

  const lastSearchRef = useRef<HTMLDivElement>(null);
  if (keyword === null) return null;
  // <SearchSkeleton search={keyword} />;

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useBookSearchInfinityQuery(keyword);

  // if (!data || isLoading) return <SearchLoader />;

  // if (data?.pages[0].documents.length === 0)
  //   return <SearchSkeleton search={keyword} />;

  return (
    <Container>
      {data?.pages.map((page) => (
        <Page key={v4()}>
          {page.documents.map((document) => (
            <SearchItem key={document.isbn} search={keyword} item={document} />
          ))}
        </Page>
      ))}
      {hasNextPage ? (
        <Observer
          fetchNextPage={fetchNextPage}
          isFetching={isFetching}
          observerRef={lastSearchRef}
          hasNextPage={hasNextPage}
        />
      ) : null}
    </Container>
  );
}
