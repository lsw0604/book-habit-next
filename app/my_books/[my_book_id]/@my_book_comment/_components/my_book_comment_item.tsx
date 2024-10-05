interface MyBookCommentItemProps {
  comment: MyBookCommentItemType;
}

export default function MyBookCommentItem({ comment }: MyBookCommentItemProps) {
  return (
    <div>
      <div>{comment.comment}</div>
      <div>{comment.createdAt}</div>
      <div>{comment.commentLikeCount}</div>
      <div>{comment.commentReplyCount}</div>
    </div>
  );
}
