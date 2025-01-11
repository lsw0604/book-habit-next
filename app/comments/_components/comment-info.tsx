'use client';

import dayjs from 'dayjs';
import { Calendar, ListFilter } from 'lucide-react';

import usePublicCommentParams from '@/hooks/public-comment/usePublicCommentParams';
import { defaultPublicCommentValue } from '@/hooks/form/public-comment/default/params';

export default function CommentInfo() {
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
      <div className="flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full text-sm">
        <Calendar className="w-4 h-4 text-gray-500" />
        {isSameDate ? (
          <>
            <span className="text-gray-600">
              {startDayjs.format('YYYY년MM월DD일')}
            </span>
          </>
        ) : (
          <>
            <span className="text-gray-600">
              {startDayjs.format('YYYY년MM월DD일')}
            </span>
            <span className="text-gray-400 mx-1">~</span>
            <span className="text-gray-600">
              {endDayjs.format('YYYY년MM월DD일')}
            </span>
          </>
        )}
      </div>
      <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-sm">
        <ListFilter className="w-4 h-4 text-gray-500" />
        <span className="text-gray-600">{pageSize}개씩 보기</span>
      </div>
    </div>
  );
}
