'use client';

import { useCallback } from 'react';

import {
  type SearchBook,
  serializeSearchBook,
  useBookSearch,
  useBookSearchParams,
} from '@/entities/book';
import { openAddBookModal } from '@/entities/modal';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { useAppDispatch } from '@/shared/redux';
import { Spinner } from '@/shared/ui/spinner';

import { BookSearchEmptyQuery } from './book-search-empty-query';
import { BookSearchError } from './book-search-error';
import { BookSearchItem } from './book-search-item';
import { BookSearchListLoader } from './book-search-list-loader';
import { BookSearchNotFound } from './book-search-not-found';
import { BookSearchListGrid } from './layout';

export function BookSearchList() {
  const dispatch = useAppDispatch();
  const params = useBookSearchParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useBookSearch(params);

  const ref = useInfiniteScroll(fetchNextPage, hasNextPage, {
    threshold: 0.3,
  });

  const modalHandler = useCallback(
    (searchBook: SearchBook) => {
      const serializedSearchBook = serializeSearchBook(searchBook);
      dispatch(openAddBookModal({ serializedSearchBook }));
    },
    [dispatch]
  );

  if (!params.query) return <BookSearchEmptyQuery />;
  if (isError) return <BookSearchError error={error} onRetry={refetch} />;
  if (!data || isLoading) return <BookSearchListLoader />;
  if (data?.length === 0) return <BookSearchNotFound />;

  return (
    <div className="w-full h-full overflow-scroll scrollbar-none">
      <BookSearchListGrid>
        {data?.map(searchBook => (
          <BookSearchItem
            key={searchBook.isbns.join('-')}
            searchBook={searchBook}
            modalHandler={modalHandler}
          />
        ))}
      </BookSearchListGrid>
      <div className="w-full flex justify-center p-4" ref={ref}>
        {isFetching && (
          <div role="status">
            <Spinner statusText="추가 결과 로딩중 ..." />
          </div>
        )}
      </div>
    </div>
  );
}
