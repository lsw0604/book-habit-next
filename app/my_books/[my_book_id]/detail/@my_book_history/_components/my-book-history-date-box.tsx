import dayjs from 'dayjs';
import { useSearchParams, useRouter } from 'next/navigation';

import { useAppDispatch } from '@/store';
import { myBookHistoryActions } from '@/store/features/my-book-history/my-book-history-action';
import { useCallback, useMemo } from 'react';
import { cn } from '@/utils/class-name';

interface MyBookHistoryDateBoxProps {
  data?: MyBookHistoryItemType[];
  date: Date;
}

export default function MyBookHistoryDateBox({
  data,
  date,
}: MyBookHistoryDateBoxProps) {
  // const dispatch = useAppDispatch();
  // const formattedDate = dayjs(date).toISOString();
  const router = useRouter();
  const searchParams = useSearchParams();
  const MAX_DOTS = 3;

  const URLDate = useMemo(() => {
    return searchParams.get('date');
  }, [searchParams]);
  const newDate = dayjs(date).format('YYYY-MM-DD');

  const isSelected = URLDate === newDate;

  const onClickDateBox = useCallback(() => {
    if (isSelected) return null;

    const params = new URLSearchParams(searchParams);
    params.set('date', newDate);

    router.replace(`?${params.toString()}`);
  }, [router, searchParams]);

  return (
    <div
      role="gridcell"
      aria-label={`${dayjs(date).format('YYYY년 MM월 DD일')}`}
      className={cn(
        'h-full w-full absolute top-0 left-0',
        isSelected && 'bg-slate-500'
      )}
      onClick={onClickDateBox}
    >
      <div className="flex items-center gap-1 w-full h-full pt-6 px-1">
        {Array.from({ length: Math.min(MAX_DOTS, data?.length || 0) }).map(
          (_, idx) => (
            <div key={idx} className="w-2 h-2 rounded-full bg-slate-700" />
          )
        )}
        {data && data.length > MAX_DOTS && (
          <span className="text-xs text-slate-600">
            +{data.length - MAX_DOTS}
          </span>
        )}
      </div>
    </div>
  );
}
