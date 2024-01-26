import React, { ReactNode } from 'react';
import CommentDetailReplyForm from './_components/comment-detail-reply-form';

export default function CommentDetailLayout({
  detail,
  list,
  params,
}: {
  params: { comment_id: number };
  list: ReactNode;
  detail: ReactNode;
}) {
  return (
    <div className="w-full h-full flex flex-col p-4 overflow-auto box-border">
      {detail}
      <div>
        <div className="flex h-full flex-col justify-between p-4 rounded-lg shadow-lg">
          {list}
          <CommentDetailReplyForm comment_id={params.comment_id} />
        </div>
      </div>
    </div>
  );
}
