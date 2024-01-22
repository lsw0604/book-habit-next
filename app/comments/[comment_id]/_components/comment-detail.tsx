'use client';

import CommentItemHeader from '../../_components/comment-item-header';
import CommentItemContent from '../../_components/comment-item-content';
import CommentItemHeart from '../../_components/comment-item-heart';
import CommentItemReply from '../../_components/comment-item-reply';
import CommentItem from '../../_components/comment-item';

import useCommentsDetailQuery from '@/queries/comments/useCommentsDetailQuery';

interface CommentDetailProps {
  comment_id: number;
}

export default function CommentDetail({ comment_id }: CommentDetailProps) {
  const { data, isLoading } = useCommentsDetailQuery(comment_id);

  if (!data || isLoading) return <CommentItem.Loader />;

  const { like_user_ids, reply_ids, comment: content, ...comment } = data;

  return (
    <div className="w-full h-auto flex p-4 relative rounded-lg flex-col shadow-lg mb-4">
      <CommentItemHeader comment={comment} />
      <CommentItemContent content={content} />
      <div className="w-full inline-flex justify-start gap-4">
        <CommentItemHeart
          comment_id={comment_id}
          like_user_ids={like_user_ids}
        />
        <CommentItemReply comment_id={comment_id} reply_ids={reply_ids} />
      </div>
    </div>
  );
}
