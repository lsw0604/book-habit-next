import CommentItemHeader from './comment-item-header';
import CommentItemContent from './comment-item-content';
import CommentItemHeart from './comment-item-heart';
import CommentItemReply from './comment-item-reply';
import Link from 'next/link';

interface CommentItemProps {
  comment: Omit<CommentsItemType, 'age_category' | 'gender'>;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const { comment_id, comment: content, reply_ids, like_user_ids } = comment;

  return (
    <li className="gap-2 flex flex-col justify-between p-4 w-full rounded-lg cursor-pointer snap-start box-border shadow-lg">
      <CommentItemHeader comment={comment} />
      <Link href={`comments/${comment_id}`}>
        <CommentItemContent content={content} />
      </Link>
      <div className="w-full inline-flex justify-start gap-4">
        <CommentItemHeart
          comment_id={comment_id}
          like_user_ids={like_user_ids}
        />
        <CommentItemReply comment_id={comment_id} reply_ids={reply_ids} btn />
      </div>
    </li>
  );
}
