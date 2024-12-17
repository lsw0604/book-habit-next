import MyBookHistoryHeader from './my-book-history-header';
import CustomCalendar from '@/components/common/calendar';

export default function MyBookHistoryLoader() {
  return (
    <section className="my-3 px-2">
      <MyBookHistoryHeader.Loader />
      <CustomCalendar.Loader />
    </section>
  );
}
