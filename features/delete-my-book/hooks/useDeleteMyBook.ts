/* eslint-disable no-underscore-dangle -- _def is query-key-factory's API */
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

import { myBookQueryKeys, type MyBookDetailDTO } from '@/entities/my-book';
import { myBookHistoryQueryKeys } from '@/entities/my-book-history';
import { myBookReviewQueryKeys } from '@/entities/my-book-review';
import type { APIError } from '@/shared/api';

import { deleteMyBookService } from '../api';

export const useDeleteMyBook = () => {
  const { deleteMyBook } = deleteMyBookService;
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  return useMutation<
    void,
    APIError,
    number,
    {
      previousDetail: MyBookDetailDTO | null | undefined;
      isbn?: string;
    }
  >({
    mutationFn: async id => deleteMyBook(id),
    onMutate: async id => {
      const detailKey = myBookQueryKeys.detail(id).queryKey;
      await queryClient.cancelQueries({ queryKey: detailKey });

      const previousDetail =
        queryClient.getQueryData<MyBookDetailDTO>(detailKey);

      let isbn = previousDetail?.book.isbn;

      if (!isbn) {
        const existQueries = queryClient.getQueriesData<MyBookDetailDTO>({
          queryKey: myBookQueryKeys.exist._def,
        });
        const found = existQueries.find(([_, data]) => data?.id === id);
        isbn = found?.[1]?.book?.isbn;
      }

      // exist 쿼리는 "이 책이 서재에 있는가"를 묻는 것이라 null이 정상적인 값이다
      if (isbn) {
        const existKey = myBookQueryKeys.exist(isbn).queryKey;
        await queryClient.cancelQueries({ queryKey: existKey });
        queryClient.setQueryData(existKey, null);
      }

      /**
       * detail 쿼리에는 null을 쓰지 않는다.
       * 이 쿼리의 타입은 non-null이라, null이 들어가면 useMyBook의
       * select(toMyBookDetailViewModel)가 null을 구조분해하며 실패한다.
       * 삭제되었다는 표현은 onSuccess의 removeQueries가 담당한다.
       */

      return { previousDetail, isbn };
    },
    onError: (_err, id, context) => {
      if (context) {
        const { previousDetail, isbn } = context;

        if (previousDetail) {
          queryClient.setQueryData(
            myBookQueryKeys.detail(id).queryKey,
            previousDetail
          );
        }

        if (isbn && previousDetail) {
          queryClient.setQueryData(
            myBookQueryKeys.exist(isbn).queryKey,
            previousDetail
          );
        }
      }
    },
    onSuccess: (_data, id, context) => {
      const { isbn } = context;

      /**
       * 삭제한 책의 상세 페이지에 머물러 있다면 목록으로 돌려보낸다.
       * 삭제 경로가 둘(인라인 액션 / 확인 모달)이지만 둘 다 이 훅을 지나므로 여기 한 곳이면 된다.
       * 검색 상세(/book/[isbn])는 경로가 달라 해당되지 않는다 — 거기서는 '추가' 상태로 남는 게 맞다.
       *
       * 아래 removeQueries보다 먼저 호출한다. 순서가 뒤바뀌면 아직 마운트된 상세 화면의
       * 옵저버가 곧바로 재요청을 보내 이미 없는 책을 다시 조회한다.
       */
      if (pathname === `/my_books/${id}/detail`) {
        router.replace('/my_books');
      }

      queryClient.invalidateQueries({ queryKey: myBookQueryKeys.list._def });

      if (isbn) {
        queryClient.setQueryData(myBookQueryKeys.exist(isbn).queryKey, null);
      }

      queryClient.removeQueries({
        queryKey: myBookQueryKeys.detail(id).queryKey,
      });
      queryClient.removeQueries({
        queryKey: myBookReviewQueryKeys.detail(id).queryKey,
      });
      queryClient.removeQueries({
        queryKey: myBookHistoryQueryKeys.list(id).queryKey,
      });
    },
  });
};
