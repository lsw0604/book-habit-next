import { FC } from 'react';

const MyBookDetailCalendarDateBox: FC<
  DateBoxType<MyBookHistoryListType | undefined>
> = ({ day, obj }) => {
  if (history) {
    const dataMapped = obj[day];

    return (
      <div className="w-full h-10">
        <div className="w-full h-full">
          {dataMapped &&
            dataMapped.map((status: MyBookHistoryItemType) => (
              <div key={status.id}>{status.status}</div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-10">
      <div className="w-full h-full">없음</div>
    </div>
  );
};

export default MyBookDetailCalendarDateBox;
