import Link from 'next/link';

import CommentItemHeader from './comment-item-header';
import CommentItemContent from './comment-item-content';
import CommentItemHeart from './comment-item-heart';
import CommentItemReply from './comment-item-reply';

import { Skeleton } from '@/components/ui/skeleton';

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

CommentItem.Loader = function () {
  return (
    <li className="gap-2 flex flex-col justify-between p-4 w-full rounded-lg shadow-lg box-border">
      <div className="w-full flex justify-between">
        <div className="w-[70%] h-10">
          <Skeleton className="w-[70%] h-7 rounded-lg bg-slate-200 mb-1" />
          <Skeleton className="w-[40%] h-3 rounded-lg bg-slate-200" />
        </div>
        <Skeleton className="w-10 h-10 rounded-full bg-slate-200" />
      </div>
      <div className="w-full h-28">
        <Skeleton className="w-full h-full rounded-lg bg-slate-200" />
      </div>
      <div className="w-full inline-flex justify-start gap-4">
        <div className="h-5 w-[50%] inline-flex gap-4">
          <Skeleton className="w-full h-full bg-slate-200" />
          <Skeleton className="w-full h-full bg-slate-200" />
        </div>
      </div>
    </li>
  );
};
