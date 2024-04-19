import Calendar from '@/components/common/calendar';
import CalendarLoader from '@/components/common/calendar/calendar-loader';

import MyBookDetailCalendarDateBox from './my-book-detail-calendar-date-box';

interface MyBookDetailCalendarProps {
  startDate?: Date;
  endDate?: Date;
  history: MyBookPageQueriesHistoryListType;
}

export default function MyBookDetailCalendar({
  startDate,
  endDate,
  history,
}: MyBookDetailCalendarProps) {
  return (
    <div className="w-full h-auto px-4 mb-4">
      <div className="w-full h-auto p-4 flex flex-col shadow-lg rounded-lg mb-4">
        <Calendar
          endDate={endDate}
          startDate={startDate}
          history={history}
          component={MyBookDetailCalendarDateBox}
        />
      </div>
    </div>
  );
}

MyBookDetailCalendar.Loader = () => {
  return (
    <div className="w-full h-auto px-4 flex flex-col">
      <div className="w-full h-auto p-4 flex flex-col shadow-lg rounded-lg">
        <CalendarLoader />
      </div>
    </div>
  );
};
