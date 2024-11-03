'use client';

import usePublicCommentParams from '@/hooks/public-comment/usePublicCommentParams';
import { usePublicComments } from '@/service/public-comment/usePublicCommentService';
import dayjs from 'dayjs';

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
    <div>
      {data.map((comment) => (
        <div key={comment.commentId}>{comment.comment}</div>
      ))}
    </div>
  );
}
