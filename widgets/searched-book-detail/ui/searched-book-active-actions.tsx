'use client';

import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import { useMyBookIsbn } from "@/entities/my-book";
import { myBookReviewService } from "@/entities/my-book-review";
import { myBookHistoryService } from "@/entities/my-book-history";

import { queryKeys } from "@/shared/query/keys";

import { SearchedBookAddAction } from "./searched-book-add-action";
import { SearchedBookUpdateAction } from "./searched-book-update-action";

interface SearchedBookActiveActionsProps {
  isbn: string;
}

export function SearchedBookActiveActions({ isbn }: SearchedBookActiveActionsProps) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useMyBookIsbn(isbn);
  const myBookId = data?.id;

  useEffect(() => {
    // 임시 낙관적 ID(예: Date.now() 타임스탬프)는 100,000,000보다 큽니다.
    // 진짜 DB 일련번호(auto_increment)일 때만 prefetch를 수행합니다.
    const isRealDbId = myBookId && myBookId < 100_000_000;

    if (isRealDbId) {
      queryClient.prefetchQuery({
        queryKey: queryKeys.myBookReview.detail(myBookId).queryKey,
        queryFn: () => myBookReviewService.getMyBookReview(myBookId),
        staleTime: 10 * 60 * 1000,
      });

      queryClient.prefetchQuery({
        queryKey: queryKeys.myBookHistory.list(myBookId).queryKey,
        queryFn: () => myBookHistoryService.getMyBookHistories(myBookId),
        staleTime: 10 * 60 * 1000,
      });
    }
  }, [myBookId, queryClient]);

  if (isLoading) return <>loading</>;
  if (isError) return <>error</>

  if (!data) return <SearchedBookAddAction isbn={isbn} />

  return (
    <SearchedBookUpdateAction data={data} />
  );
}
