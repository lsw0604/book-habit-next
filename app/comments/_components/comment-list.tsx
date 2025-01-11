'use client';

import dayjs from 'dayjs';

import { CommentItem } from './comment-item';
import usePublicCommentParams from '@/hooks/public-comment/usePublicCommentParams';
import { usePublicComments } from '@/service/public-comment/usePublicCommentService';

export default function CommentList() {
  const { endDate, pageSize, startDate } = usePublicCommentParams();
  const end_date = dayjs(endDate).format('YYYYMMDD');
  const start_date = dayjs(startDate).format('YYYYMMDD');

  const { data } = usePublicComments({
    page_size: pageSize,
    end_date,
    start_date,
  });

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-4">
      {data.map((comment) => (
        <CommentItem key={comment.commentId} {...comment} />
      ))}
    </div>
  );
}
