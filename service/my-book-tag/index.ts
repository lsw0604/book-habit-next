import { apiClient } from '../api-client';

const MY_BOOK_TAG_URL = '/api/my-book-tag';

export const addMyBookTagAPI = async (payload: RequestRegisterMyBookTag) => {
  const { data } = await apiClient.post<ResponseRegisterMyBookTag>(
    `${MY_BOOK_TAG_URL}/${payload.myBookId}`,
    JSON.stringify({
      tag: payload.tag,
    })
  );

  return data;
};

export const deleteMyBookTagAPI = async (payload: RequestDeleteMyBookTag) => {
  const { data } = await apiClient.delete<ResponseDeleteMyBookTag>(
    `${MY_BOOK_TAG_URL}/${payload.myBookTagId}`
  );

  return data;
};
