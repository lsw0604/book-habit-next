import { FC } from 'react';
import dayjs from 'dayjs';

const MyBookDetailCalendarDateBox: FC<DateBoxType> = ({
  date,
  month,
  year,
  history,
}) => {
  const dayObj = dayjs()
    .locale('ko')
    .year(year)
    .month(month - 1)
    .date(date);

  if (history) {
    const dataMapped =
      history[dayObj.add(9, 'hour').toISOString().split('T')[0]];

    return (
      <div className="w-full h-10">
        <div className="w-full h-full">
          {dataMapped &&
            dataMapped.map((status) => (
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
