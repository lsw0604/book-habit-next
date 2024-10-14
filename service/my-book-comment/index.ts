import { apiClient } from '../api-client';

const MY_BOOK_COMMENT_URL = '/api/my-book-comment';

export const getMyBookCommentListAPI = async (
  payload: RequestMyBookCommentList
) => {
  const { data } = await apiClient.get<ResponseGetMyBookCommentList>(
    `${MY_BOOK_COMMENT_URL}/${payload.myBookId}`
  );

  return data;
};

export const registerMyBookCommentAPI = async (
  payload: RequestRegisterMyBookComment
) => {
  const { data } = await apiClient.post<ResponseRegisterMyBookComment>(
    `${MY_BOOK_COMMENT_URL}/${payload.myBookId}`
  );

  return data;
};
