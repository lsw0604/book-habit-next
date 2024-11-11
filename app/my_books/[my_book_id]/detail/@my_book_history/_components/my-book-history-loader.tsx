import CalendarLoader from '@/components/common/calendar/calendar-loader';
import MyBookHistoryHeaderLoader from './my-book-history-header-loader';

export default function MyBookHistoryLoader() {
  return (
    <section className="my-3 px-2">
      <MyBookHistoryHeaderLoader />
      <CalendarLoader />
    </section>
  );
}
