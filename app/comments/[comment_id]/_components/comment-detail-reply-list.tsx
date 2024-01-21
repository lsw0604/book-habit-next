interface CommentDetailReplyListProps {
  comment_id: number;
}

export default function CommentDetailReplyList({
  comment_id,
}: CommentDetailReplyListProps) {
  return (
    <ul className="flex w-full overflow-auto relative flex-col">
      ReplyList{comment_id}
    </ul>
  );
}
