'use client';

import usePublicCommentParams from '@/hooks/public-comment/usePublicCommentParams';
import useSuspensePublicCommentInfiniteQuery from '@/queries/public-comment/useSuspensePublicCommentQuery';
import dayjs from 'dayjs';

export default function CommentList() {
  const { endDate, pageSize, startDate } = usePublicCommentParams();
  const end_date = dayjs(endDate).format('YYYYMMDD');
  const start_date = dayjs(startDate).format('YYYYMMDD');
  const { data } = useSuspensePublicCommentInfiniteQuery({
    page_size: pageSize,
    end_date,
    start_date,
  });

  const pages = data.pages.flatMap((page) => page.comments);
  return (
    <div>
      {pages.map((comment) => (
        <div key={comment.commentId}>{comment.comment}</div>
      ))}
    </div>
  );
}
