import { apiClient } from '../api-client';

const MY_BOOK_URL = '/api/my-book';

export const registerMyBookAPI = async (payload: RequestRegisterMyBook) => {
  const { data } = await apiClient.post<ResponseRegisterMyBook>(
    `${MY_BOOK_URL}`,
    JSON.stringify(payload)
  );

  return data;
};

export const getMyBookListAPI = async ({
  status = 'ALL',
  page = 1,
  order = 'desc',
}: RequestGetMyBookList) => {
  const { data } = await apiClient.get<ResponseGetMyBookList>(
    `${MY_BOOK_URL}?status=${status}&page=${page}&order=${order}`
  );

  return data;
};

export const getMyBookDetailAPI = async (myBookId: RequestGetMyBookDetail) => {
  const { data } = await apiClient.get<ResponseGetMyBookDetail>(
    `${MY_BOOK_URL}/${myBookId}`
  );

  return data;
};

export const putMyBookDetailAPI = async (payload: RequestPutMyBookDetail) => {
  const { myBookStatus, rating, myBookId } = payload;
  const { data } = await apiClient.put<ResponsePutMyBookDetail>(
    `${MY_BOOK_URL}/${myBookId}`,
    JSON.stringify({ myBookStatus, rating })
  );

  return data;
};
