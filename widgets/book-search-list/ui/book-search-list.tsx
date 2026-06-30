'use client';

import { useCallback } from 'react';

import { useModal } from '@/entities/modal';
import { Spinner } from '@/shared/ui/spinner';
import { useInfiniteScroll, useQueryParams } from '@/shared/hooks';
import {
  BookSearchItem,
  bookSearchParamsSchema,
  type BookSummary,
  useBookSearch,
} from '@/features/book-search';

import { BookSearchEmptyQuery } from './book-search-empty-query';
import { BookSearchError } from './book-search-error';
import { BookSearchListGrid } from './layout';
import { BookSearchListLoader } from './book-search-list-loader';
import { BookSearchNotFound } from './book-search-not-found';


export function BookSearchList() {
  const { open } = useModal();
  const params = useQueryParams(bookSearchParamsSchema);
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
    (bookSummary: BookSummary) => {
      open('PREVIEW_BOOK', { bookSummary });
    },
    [open]
  );

  const renderContent = () => {
    if (!params.query) return <BookSearchEmptyQuery />;
    if (isError) return <BookSearchError error={error} onRetry={refetch} />;
    if (!data || isLoading) return <BookSearchListLoader />;
    if (data?.length === 0) return <BookSearchNotFound />;
    return (
      <>
        <BookSearchListGrid>
          {data?.map(item => (
            <BookSearchItem
              key={`${item.title}-${item.isbn}`}
              item={item}
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
      </>
    );
  };

  return (
    <div className="flex-1 flex flex-col px-4">
      {renderContent()}
    </div>
  );
}
