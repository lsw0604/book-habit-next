import { useInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import type { APIError } from '@/shared/api';

import { myBookQueryKeys, type GetMyBooksPayload, type MyBooksDTO, myBookService } from '../api';
import { toMyBooksViewModel } from '../lib';
import type { MyBooks } from '../model';

/**
 * 모듈 레벨에 두어 참조를 고정한다.
 * 인라인 화살표는 렌더마다 새 함수가 되어 TanStack Query가 이전 결과를 재사용하지 못하고,
 * 데이터가 그대로여도 누적된 페이지 전체를 다시 병합·변환한다.
 * 무한 스크롤로 항목이 쌓일수록 반복량이 커지는 자리다.
 */
const selectMyBooks = (data: InfiniteData<MyBooksDTO>): MyBooks => {
  if (data.pages.length === 0) {
    return {
      books: [],
      meta: {
        totalCount: 0,
        totalPages: 0,
        currentPage: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }

  const lastPage = data.pages[data.pages.length - 1];
  const lastMeta = lastPage.meta;

  return toMyBooksViewModel({
    books: data.pages.flatMap(page => page.books || []),
    meta: lastMeta,
  });
};

export const useMyBooks = (
  params: Pick<GetMyBooksPayload, 'order' | 'status'>
) => {
  const { getMyBooks } = myBookService;

  return useInfiniteQuery<MyBooksDTO, APIError, MyBooks>({
    queryKey: myBookQueryKeys.list(params).queryKey,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getMyBooks({
        ...params,
        page: pageParam as number,
      });
      return response;
    },
    getNextPageParam: response => response.meta?.nextPage,
    initialPageParam: 1,
    select: selectMyBooks,
    gcTime: 5 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });
};
