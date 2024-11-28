import { useAppDispatch } from '@/store';
import { modalActions } from '@/store/features/modal/modal-action';
import { myBookHistoryActions } from '@/store/features/my-book-history/my-book-history-action';
import dayjs from 'dayjs';

interface MyBookHistoryDateBoxProps {
  data?: MyBookHistoryItemType[];
  date: Date;
}

export default function MyBookHistoryDateBox({
  data,
  date,
}: MyBookHistoryDateBoxProps) {
  const dispatch = useAppDispatch();
  const formattedDate = dayjs(date).toISOString();

  const onClickDateBox = () => {
    dispatch(
      myBookHistoryActions.setMyBookHistoryState({
        createHistory: {
          date: formattedDate,
          page: 1,
          memo: '',
        },
        selectedHistory: data,
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
            <div key={idx} className="w-2 h-2 rounded-full bg-slate-700" />
          ))}
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
