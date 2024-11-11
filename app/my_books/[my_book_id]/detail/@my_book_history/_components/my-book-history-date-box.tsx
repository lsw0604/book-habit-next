import { useAppDispatch } from '@/store';
import { modalActions } from '@/store/features/modal/modal-action';
import { myBookHistoryActions } from '@/store/features/my-book-history/my-book-history-action';
import { cn } from '@/utils/class-name';
import dayjs from 'dayjs';

interface MyBookHistoryDateBoxProps {
  data?: MyBookHistoryItemType[];
  date: Date;
}

const BG_COLOR = ['bg-slate-700', 'bg-slate-500', 'bg-slate-300'];

/**
 * TODO : data ErrorBoundary
 */
export default function MyBookHistoryDateBox({
  data,
  date,
}: MyBookHistoryDateBoxProps) {
  const dispatch = useAppDispatch();
  const formattedDate = dayjs(date.toISOString()).format('YYYY-MM-DD');
  const onClickDateBox = () => {
    dispatch(
      myBookHistoryActions.setMyBookHistoryState({
        createHistory: {
          date: formattedDate,
          page: 0,
          memo: '',
        },
        selectedHistory: data,
      })
    );

    dispatch(
      modalActions.setModalState({
        isOpen: true,
        type: 'register-my-book-history',
      })
    );
  };

  if (data) {
    const count = data.length > 3 ? 3 : data.length;

    return (
      <div
        className="h-full w-full absolute top-0 left-0"
        onClick={onClickDateBox}
      >
        <div className="mt-6 flex gap-1 p-1 flex-wrap">
          {Array.from({ length: count }).map((_, idx) => (
            <div
              key={idx}
              className={cn('w-2 h-2 rounded-full', BG_COLOR[idx])}
            />
          ))}
        </div>
        <div className="w-full flex">
          <span className="ml-auto text-xs mb-2 mr-2 font-bold">+ {count}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-full w-full absolute top-0 left-0"
      onClick={onClickDateBox}
    />
  );
}
