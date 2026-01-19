'use client';

import { useCallback } from 'react';

import {
  useKakaoBookSearch,
  useBookSearchParams,
  BookSummary,
} from '@/entities/book';
import { useModal } from '@/entities/modal';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { Spinner } from '@/shared/ui/spinner';

import { BookSearchEmptyQuery } from './book-search-empty-query';
import { BookSearchError } from './book-search-error';
import { BookSearchItem } from './book-search-item';
import { BookSearchListLoader } from './book-search-list-loader';
import { BookSearchNotFound } from './book-search-not-found';
import { BookSearchListGrid } from './layout';

export function BookSearchList() {
  const { open } = useModal();
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
  } = useKakaoBookSearch(params);

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
    <div className="flex-1 flex flex-col overflow-y-auto scrollbar-none">
      {renderContent()}
    </div>
  );
}
