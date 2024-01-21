import { MessageCircleMoreIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CommentItemReplyProps {
  comment_id: number;
  reply_ids: { reply_id: number }[];
  btn?: boolean;
}

export default function CommentItemReply({
  comment_id,
  reply_ids,
  btn,
}: CommentItemReplyProps) {
  const router = useRouter();

  const navigateCommentDetail = btn
    ? () => router.push(`/comments/${comment_id}`)
    : () => null;

  return (
    <div
      onClick={navigateCommentDetail}
      className="h-5 w-12 inline-flex gap-4 cursor-pointer"
    >
      <div className="h-full w-4 cursor-pointer flex justify-center items-center">
        <MessageCircleMoreIcon className="w-4 h-4" />
      </div>
      <p className="h-full text-sm">{reply_ids.length}</p>
    </div>
  );
}
