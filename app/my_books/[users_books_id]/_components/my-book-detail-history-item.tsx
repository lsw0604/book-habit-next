import { myBookHistoryDeleteAPI } from '@/lib/api/myBook';
import { cn } from '@/lib/utils';
import { queriesKey, queryClient } from '@/queries';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import { XIcon } from 'lucide-react';

interface RegisterHistoryModalProps {
  data: MyBookPageQueriesHistoryItemType;
  myBookId: number;
}

const STATUS_COLOR_OBJECT: Record<HistoryStatusType, string> = {
  읽는중: 'bg-rose-300',
  다읽음: 'bg-purple-300',
  읽기시작함: 'bg-yellow-300',
  읽고싶음: 'bg-orange-300',
};

const { useMyBookHistoryDeleteMutationKey, useMyBookPageQueriesKey } =
  queriesKey.myBook;
const { history } = useMyBookPageQueriesKey;

export default function MyBookDetailHistoryItem({
  data,
  myBookId,
}: RegisterHistoryModalProps) {
  const { created_at, date, id, page, status, updated_at } = data;
  const { mutate } = useMutation<
    MyBookHistoryDeleteMutationResponseType,
    AxiosError<{ message: string; status: StatusType }>,
    MyBookHistoryDeleteMutationRequestType
  >(
    [useMyBookHistoryDeleteMutationKey, id.toString(), myBookId.toString()],
    myBookHistoryDeleteAPI,
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [history, myBookId.toString()],
        });
      },
    }
  );

  const timeStamp = updated_at
    ? `${dayjs(updated_at)
        .add(9, 'hour')
        .format('YYYY년MM월DD일 HH시mm분ss초')} 수정`
    : `${dayjs(created_at)
        .add(9, 'hour')
        .format('YYYY년MM월DD일 HH시mm분ss초')} 등록`;

  const timeLine = dayjs(date).add(9, 'hour').format('YYYY년MM월DD일');

  const deleteHistoryHandler = () => {
    mutate(id);
  };

  return (
    <li className="inline-flex h-16 w-full snap-start">
      <div
        className={cn(
          'w-2 rounded-sm h-auto mr-2',
          STATUS_COLOR_OBJECT[status]
        )}
      />
      <div className="w-full flex items-start flex-col justify-center">
        <p className="text-xs">
          {timeLine}&nbsp;
          <span
            className={cn('px-2 rounded-sm mr-2', STATUS_COLOR_OBJECT[status])}
          >
            {status}
          </span>
          {page && <span className="">{page}쪽 읽음</span>}
        </p>
        <div className="text-xs text-gray-400 flex flex-col justify-center">
          {timeStamp}
        </div>
      </div>
      <div className="w-4 h-full flex justify-center items-center">
        <i className="w-8 h-4 flex justify-center items-center">
          <XIcon onClick={deleteHistoryHandler} />
        </i>
      </div>
    </li>
  );
}
