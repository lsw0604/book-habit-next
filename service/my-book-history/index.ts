import { apiClient } from '../api-client';

const MY_BOOK_HISTORY_URL = '/api/my-book-history';

export const getMyBookHistoryAPI = async (payload: RequestGetMyBookHistory) => {
  const { data } = await apiClient.get<ResponseGetMyBookHistory>(
    `${MY_BOOK_HISTORY_URL}/${payload}`
  );

  return data;
};

export const registerMyBookHistoryAPI = async (
  payload: RequestRegisterMyBookHistory
) => {
  const { data } = await apiClient.post(
    `${MY_BOOK_HISTORY_URL}/${payload.myBookId}`,
    JSON.stringify({
      page: payload.page,
      date: payload.date,
      memo: payload.memo,
    })
  );

  return data;
};

export const updateMyBookHistoryAPI = () => {};

export const deleteMyBookHistoryAPI = () => {};
