'use client';

import { useBookQuery } from '@/entities/book/hooks/useBook';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll';
import { BOOK_SEARCH_LIST_GRID_STYLE } from '@/shared/style/list-style';
import { Spinner } from '@/shared/ui/spinner';
import { cn } from '@/shared/utils';

import { useBookSearchModal, useBookSearchParams } from '../../hooks';

import { BookSearchItem } from './book-search-item';
import { BookSearchListLoader } from './book-search-list-loader';
import { BookSearchListNotFound } from './book-search-list-not-found';

export function BookSearchList() {
  const { query, size, sort, target } = useBookSearchParams();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useBookQuery({ query, size, sort, target });

  const ref = useInfiniteScroll(fetchNextPage, hasNextPage, {
    threshold: 0.3,
  });
  const { modalHandler } = useBookSearchModal();

  if (isLoading) return <BookSearchListLoader count={size} />;
  if (!data || !query || data.length === 0 || isError)
    return (
      <BookSearchListNotFound
        query={query}
        isError={isError}
        errorMessage={error?.response?.data.message}
        refetch={refetch}
      />
    );

  return (
    <div className={cn('w-full h-full overflow-scroll scrollbar-none')}>
      <ul
        className={cn(
          'w-full px-4 flex flex-col gap-4 mb-2', // 기본 모바일 레이아웃
          BOOK_SEARCH_LIST_GRID_STYLE
        )}
      >
        {data.map(book => (
          <BookSearchItem
            key={book.isbns.join('-')}
            book={book}
            modalHandler={modalHandler}
          />
        ))}
      </ul>
      <div className="w-full flex justify-center p-4" ref={ref}>
        {isFetching && (
          <div role="status">
            <span className="sr-only">추가 결과 로딩 중...</span>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
}
