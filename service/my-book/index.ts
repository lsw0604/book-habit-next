import { createClient } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/axios/constant';
import { stringify } from 'querystring';

export const MyBookService = () => {
  let instance: ReturnType<typeof myBookService> | null = null;

  const myBookService = () => {
    const apiClient = createClient();

    const getMyBooks = async ({
      order = 'desc',
      page = 1,
      status = 'ALL',
    }: RequestGetMyBookList = {}) => {
      const queryString = stringify({ order, page, status });
      return apiClient.get<ResponseGetMyBookList>(
        `${API_ENDPOINTS.MY_BOOK}?${queryString}`
      );
    };

    const getMyBookDetail = async (myBookId: number) => {
      return apiClient.get<ResponseGetMyBookDetail>(
        `${API_ENDPOINTS.MY_BOOK}/${myBookId}`
      );
    };

    const addMyBook = async (payload: RequestPostMyBook) => {
      return apiClient.post<ResponsePostMyBook>(
        API_ENDPOINTS.MY_BOOK,
        JSON.stringify(payload)
      );
    };

    const updateMyBook = async ({
      myBookId,
      myBookStatus,
      rating,
    }: RequestPutMyBook) => {
      return apiClient.put<ResponsePutMyBook>(
        `${API_ENDPOINTS.MY_BOOK}/${myBookId}`,
        JSON.stringify({
          myBookStatus,
          rating,
        })
      );
    };

    const deleteMyBook = async (myBookId: number) => {
      return apiClient.delete<ResponseDeleteMyBook>(
        `${API_ENDPOINTS}/${myBookId}`
      );
    };

    return {
      getMyBooks,
      getMyBookDetail,
      addMyBook,
      updateMyBook,
      deleteMyBook,
    };
  };

  return {
    getInstance: () => {
      if (!instance) {
        instance = myBookService();
      }
      return instance;
    },
  };
};
