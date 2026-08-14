'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

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

  return <UpdateMyBookAction data={data} />;
}
