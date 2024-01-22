'use client';

import useCommentsReplyListQuery from '@/queries/comments/useCommentsReplyListQuery';
import CommentDetailReplyItem from './comment-detail-reply-item';

interface CommentDetailReplyListProps {
  comment_id: number;
}

export default function CommentDetailReplyList({
  comment_id,
}: CommentDetailReplyListProps) {
  const { data, isLoading } = useCommentsReplyListQuery(comment_id);

  if (!data || isLoading) return <CommentDetailReplyList.Loader />;
  if (data?.length === 0) return <CommentDetailReplyList.Empty />;

  return (
    <ul className="flex w-full overflow-auto relative flex-col mb-3">
      {data?.map((reply) => (
        <CommentDetailReplyItem
          key={reply.reply_id}
          comment_id={comment_id}
          {...reply}
        />
      ))}
    </ul>
  );
}

CommentDetailReplyList.Empty = function () {
  return (
    <ul className="w-full h-full flex mb-3">
      <div className="text-sm bg-[rgba(0,0,0,0.05)] flex justify-center items-center w-full h-full rounded-lg">
        아직 등록된 댓글이 없습니다.
      </div>
    </ul>
  );
};

CommentDetailReplyList.Loader = function () {
  return (
    <ul className="w-full h-full flex mb-3 flex-col">
      <CommentDetailReplyItem.Loader />
      <CommentDetailReplyItem.Loader />
      <CommentDetailReplyItem.Loader />
    </ul>
  );
};
