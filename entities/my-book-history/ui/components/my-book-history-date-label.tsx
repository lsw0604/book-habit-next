import { isEqual } from 'date-fns';

import { cn, formatDate, normalizedDate } from '@/shared/utils';

import { MyBookHistory, SerializedMyBookHistory } from '../../model';

type MyBookHistoryDateType =
  | Pick<MyBookHistory, 'createdAt' | 'updatedAt'>
  | Pick<SerializedMyBookHistory, 'createdAt' | 'updatedAt'>;

interface MyBookHistoryDateLabelProps {
  history: MyBookHistoryDateType;
  className?: string;
}

export function MyBookHistoryDateLabel({
  history,
  className,
}: MyBookHistoryDateLabelProps) {
  const formattedCreatedAt: Date = normalizedDate(history.createdAt);
  const formattedUpdatedAt: Date = normalizedDate(history.updatedAt);

  const isUpdatedLabel = isEqual(formattedCreatedAt, formattedUpdatedAt)
    ? '에 기록됨'
    : '에 수정됨';
  const isUpdatedDate = isEqual(formattedCreatedAt, formattedUpdatedAt)
    ? formattedCreatedAt
    : formattedUpdatedAt;

  const formattedDate = formatDate(isUpdatedDate, 'full');

  return (
    <div className={cn('text-center w-full', className)}>
      <p className="text-xs text-gray-400">
        {formattedDate}
        {isUpdatedLabel}
      </p>
    </div>
  );
}
