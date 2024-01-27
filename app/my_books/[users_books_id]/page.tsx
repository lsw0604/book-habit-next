import MyBookDetailInfo from './_components/my-book-detail-info';
import Calendar from '@/components/common/calendar';

export default function MyBookDetailPage({
  params,
}: {
  params: { users_books_id: number };
}) {
  const { users_books_id } = params;
  return (
    <div>
      <MyBookDetailInfo users_books_id={users_books_id} />

      <Calendar />
    </div>
  );
}
