'use client';

import styled from 'styled-components';

import CommentDetailReplyItem from 'components/commentDetail/CommentDetailReplyItem';
import CommentDetailSkeleton from 'components/commentDetail/CommentDetailSkeleton';
import useCommentsReplyListQuery from 'queries/comments/useCommentsReplyListQuery';

interface IProps {
  comment_id: number;
}

const Container = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: scroll;
`;

const EMPTY_MESSAGE = '아직 등록된 댓글이 없습니다.';
const SKELETON_HEIGHT = '100%';

export default function CommentDetailReplyList({ comment_id }: IProps) {
  const { data, isLoading, isFetching } = useCommentsReplyListQuery(comment_id);

  if (isLoading || isFetching)
    return (
      <CommentDetailSkeleton
        isLoading
        message={EMPTY_MESSAGE}
        height={SKELETON_HEIGHT}
      />
    );

  if (data?.length === 0) {
    return (
      <CommentDetailSkeleton height={SKELETON_HEIGHT} message={EMPTY_MESSAGE} />
    );
  }

  return (
    <Container>
      {data?.map((reply) => (
        <CommentDetailReplyItem key={reply.reply_id} {...reply} />
      ))}
    </Container>
  );
}
