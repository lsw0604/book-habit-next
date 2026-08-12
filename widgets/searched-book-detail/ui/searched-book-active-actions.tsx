'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useModal } from '@/entities/modal';
import { useMyBookIsbn } from '@/entities/my-book';
import {
  myBookHistoryQueryKeys,
  myBookHistoryService,
} from '@/entities/my-book-history';
import {
  myBookReviewQueryKeys,
  myBookReviewService,
} from '@/entities/my-book-review';
import { AddMyBookAction } from '@/features/add-my-book';
import { UpdateMyBookAction } from '@/features/update-my-book';

import { SearchedBookActiveActionsError } from './searched-book-active-actions-error';
import { SearchedBookActiveActionsLoader } from './searched-book-active-actions-loader';

interface SearchedBookActiveActionsProps {
  isbn: string;
}

export function SearchedBookActiveActions({
  isbn,
}: SearchedBookActiveActionsProps) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error, refetch } = useMyBookIsbn(isbn);
  const { open } = useModal();
  const myBookId = data?.id;

  useEffect(() => {
    if (!myBookId) return;

    queryClient.prefetchQuery({
      queryKey: myBookReviewQueryKeys.detail(myBookId).queryKey,
      queryFn: () => myBookReviewService.getMyBookReview(myBookId),
      staleTime: 10 * 60 * 1000,
    });

    queryClient.prefetchQuery({
      queryKey: myBookHistoryQueryKeys.list(myBookId).queryKey,
      queryFn: () => myBookHistoryService.getMyBookHistories(myBookId),
      staleTime: 10 * 60 * 1000,
    });
  }, [myBookId, queryClient]);

  if (isLoading) return <SearchedBookActiveActionsLoader />;
  if (isError) {
    return (
      <SearchedBookActiveActionsError error={error} onRetry={() => refetch()} />
    );
  }

  if (!data) return <AddMyBookAction isbn={isbn} />;

  // eslint-disable-next-line no-underscore-dangle -- _count is the API's field name
  const hasReview = data._count.review > 0;

  const handleReviewClick = () => {
    if (hasReview) {
      open('UPDATE_MY_BOOK_REVIEW', { myBookId: data.id });
    } else {
      open('ADD_MY_BOOK_REVIEW', { myBookId: data.id, isbn: data.book.isbn });
    }
  };

  return <UpdateMyBookAction data={data} onReviewClick={handleReviewClick} />;
}
