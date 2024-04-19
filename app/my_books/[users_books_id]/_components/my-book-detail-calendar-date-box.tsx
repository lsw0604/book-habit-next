import dayjs from 'dayjs';
import { FC } from 'react';

const MyBookDetailCalendarDateBox: FC<DateBoxType> = ({
  date,
  month,
  year,
  history,
}) => {
  const day = dayjs(`${year}-${month}-${date}`);

  console.log(history);
  return (
    <div className="w-full h-10">
      <div className="w-full h-full">
        {month}
        {year}
        {date}
      </div>
    </div>
  );
};

export default MyBookDetailCalendarDateBox;
