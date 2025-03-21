import type {
  ResponseGetMyBooks,
  ResponsePutMyBook,
  MyBookStatus,
  MyBookOrder,
} from '@/service/api/my-book/types';
import { queryKeys } from '@/queries';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';

export const useMyBooksUpdateCache = () => {
  const queryClient = useQueryClient();
  const allOrders: MyBookOrder[] = ['desc', 'asc'];

  const updateMyBooksQueryData = (response: ResponsePutMyBook) => {
    allOrders.forEach(order => {
      ([response.status, 'ALL'] as const).forEach(
        (status: MyBookStatus | 'ALL') => {
          const queryKey = queryKeys.myBook.list({
            status,
            order,
          }).queryKey;
          const previousMyBookData =
            queryClient.getQueryData<InfiniteData<ResponseGetMyBooks>>(
              queryKey
            );

          if (previousMyBookData) {
            const newInfiniteData = {
              pageParams: [...previousMyBookData.pageParams],
              pages: previousMyBookData.pages.map(page => {
                if (page.books) {
                  return {
                    ...page,
                    books: page.books.map(myBook => {
                      if (myBook.id === response.id) {
                        return {
                          ...myBook,
                          status: response.status,
                          rating: response.rating,
                        };
                      }
                      return myBook;
                    }),
                  };
                }
                return page;
              }),
            };

            queryClient.setQueryData<InfiniteData<ResponseGetMyBooks>>(
              queryKey,
              newInfiniteData
            );
          }
        }
      );
    });
  };
  return { updateMyBooksQueryData };
};
