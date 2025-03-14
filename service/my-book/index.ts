import { createClient } from '@/lib/axios';
import { createAxios } from '@/lib/axios/axios';
import { API_ENDPOINTS } from '@/lib/axios/constant';
import { stringify } from 'querystring';

export const createMyBookService = () => {
  const client = createClient();

  return {
    getMyBooks: ({
      order = 'asc',
      page = 1,
      status = 'ALL',
    }: RequestGetMyBookList) => {
      const queryString = stringify({ page, status, order });
      const response = createAxios.get<ResponseGetMyBookList>(
        `${API_ENDPOINTS.MY_BOOK}?${queryString}`
      );
      return response;
    },
    getMyBook: (myBookId: number) =>
      client.get<ResponseGetMyBookDetail>(
        `${API_ENDPOINTS.MY_BOOK}/${myBookId}`
      ),
    addMyBook: (payload: RequestPostMyBook) =>
      client.post<ResponsePostMyBook, RequestPostMyBook>(
        API_ENDPOINTS.MY_BOOK,
        { data: payload }
      ),
    updateMyBook: ({ myBookId, myBookStatus, rating }: RequestPutMyBook) =>
      client.patch<ResponsePutMyBook, Omit<RequestPutMyBook, 'myBookId'>>(
        `${API_ENDPOINTS.MY_BOOK}/${myBookId}`,
        {
          data: {
            myBookStatus,
            rating,
          },
        }
      ),
    deleteMyBook: (myBookId: number) =>
      client.delete<ResponseDeleteMyBook>(
        `${API_ENDPOINTS.MY_BOOK}/${myBookId}`
      ),
  };
};

let myBookServiceInstance: ReturnType<typeof createMyBookService> | null = null;

export const getMyBookService = () => {
  if (!myBookServiceInstance) {
    myBookServiceInstance = createMyBookService();
  }
  return myBookServiceInstance;
};
