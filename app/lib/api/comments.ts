import { axios } from './';

// READ

/**
 * * 한줄평을 공개로 등록한 목록을 불러오는 API
 */
export const commentsListAPI = async () => {
  const { data } = await axios.get<CommentsListQueryResponseType>(
    `/api/comments/list`
  );
  return data;
};

/**
 * * 특정 comment_id를 가진 comments를 불러오는 API
 */
export const commentsDetailAPI = async (
  comment_id: CommentsDetailQueryRequestType
) => {
  const { data } = await axios.get<CommentsDetailQueryResponseType>(
    `/api/comments/detail/${comment_id}`
  );
  return data;
};

/**
 * * 특정 comment_id의 가진 reply를 불러오는 API
 */
export const commentsReplyListAPI = async (comment_id: number) => {
  const { data } = await axios.get(`/api/comments/reply/list/${comment_id}`);
  return data;
};

// CREATE

/**
 * * 한줄평에 좋아요를 등록하는 API
 */
export const commentsLikeRegisterAPI = async (
  comment_id: CommentsLikeMutationRequestType
) => {
  const { data } = await axios.post<CommentsLikeMutationResponseType>(
    `/api/comments/like/register/${comment_id}`
  );
  return data;
};

/**
 * * 한줄평에 댓글을 등록하는 API
 */
export const commentsReplyRegisterAPI = async ({
  body,
  comment_id,
}: CommentsReplyMutationRequestType) => {
  const { data } = await axios.post<CommentsReplyMutationResponseType>(
    `/api/comments/reply/register/${comment_id}`,
    body
  );
  return data;
};

// DELETE

/**
 * * 한줄평에 등록된 좋아요를 삭제하는 API
 */
export const commentsLikeDeleteAPI = async (
  comment_id: CommentsLikeDeleteMutationRequestType
) => {
  const { data } = await axios.delete<CommentsLikeDeleteMutationResponseType>(
    `/api/comments/like/delete/${comment_id}`
  );
  return data;
};

/**
 * * 한줄평에 등록된 댓글을 삭제하는 API
 */
export const commentsReplyDeleteAPI = async (
  reply_id: CommentsReplyDeleteMutationRequestType
) => {
  const { data } = await axios.delete<CommentsReplyDeleteMutationResponseType>(
    `/api/comments/reply/delete/${reply_id}`
  );
  return data;
};
