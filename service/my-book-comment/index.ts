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
    `${MY_BOOK_COMMENT_URL}/${payload.myBookId}`,
    JSON.stringify({ comment: payload.comment, isPublic: payload.isPublic })
  );

  return data;
};

export const updateMyBookCommentAPI = async (
  payload: RequestUpdateMyBookComment
) => {
  const { data } = await apiClient.put<ResponseUpdateMyBookComment>(
    `${MY_BOOK_COMMENT_URL}/${payload.myBookId}`,
    JSON.stringify({ comment: payload.comment, isPublic: payload.isPublic })
  );

  return data;
};

export const deleteMyBookCommentAPI = async (
  payload: RequestDeleteMyBookComment
) => {
  const { data } = await apiClient.delete<ResponseDeleteMyBookComment>(
    `${MY_BOOK_COMMENT_URL}/${payload}`
  );
  return data;
};
