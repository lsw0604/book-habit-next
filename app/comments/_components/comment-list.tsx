'use client';

import usePublicCommentParams from '@/hooks/public-comment/usePublicCommentParams';
import usePublicCommentInfiniteQuery from '@/queries/public-comment/usePublicCommentInfiniteQuery';
import dayjs from 'dayjs';

export default function CommentList() {
  const { endDate, pageSize, startDate } = usePublicCommentParams();
  const end_date = dayjs(endDate).format('YYYYMMDD');
  const start_date = dayjs(startDate).format('YYYYMMDD');
  const { data } = usePublicCommentInfiniteQuery({
    page_size: pageSize,
    end_date,
    start_date,
  });

  console.log(data);
  return <div>CommentList</div>;
}
