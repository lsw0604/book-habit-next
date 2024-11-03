'use client';

import dayjs from 'dayjs';
import Tag from '@/components/common/tag';
import usePublicCommentParams from '@/hooks/public-comment/usePublicCommentParams';
import { defaultPublicCommentValue } from '@/hooks/form/public-comment/default/params';

export default function CommentTag() {
  const { endDate, pageSize, startDate } = usePublicCommentParams();
  const endDayjs = dayjs(endDate);
  const startDayjs = dayjs(startDate);

  const isEndDate = endDate !== defaultPublicCommentValue.endDate;
  const isStartDate = startDate !== defaultPublicCommentValue.startDate;
  const isSameDate =
    isEndDate &&
    isStartDate &&
    dayjs(endDate).format('YYYYMMDD') === dayjs(startDate).format('YYYYMMDD');

  return (
    <div className="w-full flex items-center flex-wrap justify-start gap-2">
      <Tag>
        {!isSameDate ? (
          <>
            <span className="font-bold">{startDayjs.year()}</span>년{' '}
            <span className="font-bold">{startDayjs.month() + 1}</span>월{' '}
            <span className="font-bold">{startDayjs.date()}</span>일 ~{' '}
            <span className="font-bold">{endDayjs.year()}</span>년{' '}
            <span className="font-bold">{endDayjs.month() + 1}</span>월{' '}
            <span className="font-bold">{endDayjs.date()}</span>일
          </>
        ) : (
          <>
            <span className="font-bold">{startDayjs.year()}</span>년{' '}
            <span className="font-bold">{startDayjs.month() + 1}</span>월{' '}
            <span className="font-bold">{startDayjs.date()}</span>일
          </>
        )}
      </Tag>
      <Tag>
        <span className="font-bold">{pageSize}</span>의 크기
      </Tag>
    </div>
  );
}
