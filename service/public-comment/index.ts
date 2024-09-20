import { apiClient } from '../api-client';

const PUBLIC_COMMENT_URL = '/api/public-comment';

export const getPublicCommentListAPI = async (
  payload?: RequestGetPublicCommentList
) => {
  const params = new URLSearchParams({
    ...payload,
  }).toString();

  const { data } = await apiClient.get<ResponseGetPublicCommentList>(
    `${PUBLIC_COMMENT_URL}?${params}`
  );

  return data;
};
