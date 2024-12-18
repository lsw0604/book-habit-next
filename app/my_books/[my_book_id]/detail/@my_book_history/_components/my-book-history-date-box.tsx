import dayjs from 'dayjs';
import { HTMLAttributes, useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '@/store';
import { myBookHistoryActions } from '@/store/features/my-book-history/my-book-history-action';
import { myBookHistorySelector } from '@/store/features/my-book-history/my-book-history-selector';
import { cn } from '@/utils/class-name';

interface MyBookHistoryDateBoxProps extends HTMLAttributes<HTMLDivElement> {
  data?: MyBookHistoryItemType[];
  date: Date;
}

const MAX_DOTS = 3;
const DOTS_SIZE = 2;

export default function MyBookHistoryDateBox({
  data,
  date,
  ...props
}: MyBookHistoryDateBoxProps) {
  const dispatch = useAppDispatch();
  const { selectedDate } = useAppSelector(myBookHistorySelector);

  const formattedDate = useMemo(() => dayjs(date).toISOString(), [date]);
  const isSelected = selectedDate === formattedDate;
  const dotCounts = Math.min(MAX_DOTS, data?.length || 0);
  const remainingCount = (data?.length || 0) - MAX_DOTS;

  const onClickDateBox = useCallback(() => {
    if (isSelected) return null;

    console.log(selectedDate, date);
    dispatch(
      myBookHistoryActions.setMyBookHistoryState({
        selectedDate: formattedDate,
        selectedHistory: data,
      })
    );
  }, [date, data, dispatch, selectedDate]);

  return (
    <div
      role="gridcell"
      tabIndex={0}
      aria-selected={isSelected}
      className={cn(
        'h-full w-full absolute top-0 left-0',
        'transition-all duration-200 ease-in-out',
        'cursor-pointer focus:outline-none',
        isSelected
          ? 'shadow-lg ring-2 ring-blue-400 z-10 rounded-md'
          : 'shadow-none'
      )}
      onClick={onClickDateBox}
      {...props}
    >
      <div
        className="flex items-center gap-1 w-full h-full pt-6 px-1"
        aria-hidden="true"
      >
        {Array.from({ length: dotCounts }).map((_, idx) => (
          <div
            key={idx}
            className={cn(
              'rounded-full bg-slate-700',
              `w-${DOTS_SIZE} h-${DOTS_SIZE}`
            )}
          />
        ))}
        {remainingCount > 0 && (
          <span className="text-xs text-slate-600">+{remainingCount}</span>
        )}
      </div>
    </div>
  );
}
