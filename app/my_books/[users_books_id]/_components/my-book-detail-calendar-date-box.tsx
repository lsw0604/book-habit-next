import { cn } from '@/lib/utils';
import { FC } from 'react';

const STATUS_COLOR_OBJECT: Record<HistoryStatusType, string> = {
  읽는중: 'bg-rose-300',
  다읽음: 'bg-purple-300',
  읽기시작함: 'bg-yellow-300',
  읽고싶음: 'bg-orange-300',
};

const MyBookDetailCalendarDateBox: FC<
  DateBoxType<MyBookHistoryListType | undefined>
> = ({ day, obj }) => {
  if (!!obj[day]) {
    const dataMapped = obj[day];

    return (
      <div className="w-full h-auto">
        <div className="w-full h-full">
          {dataMapped &&
            dataMapped.map((element: MyBookHistoryItemType) => (
              <div
                key={element.id}
                className={cn(
                  STATUS_COLOR_OBJECT[element.status],
                  'rounded-md text-center h-auto w-[90%] overflow-scroll'
                )}
              >
                {element.status}
              </div>
            ))}
        </div>
      </div>
    );
  }

  return <div className="w-full h-auto" />;
};

export default MyBookDetailCalendarDateBox;
