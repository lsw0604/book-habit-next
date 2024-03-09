import MyBookDetailInfo from './_components/my-book-detail-info';
import MyBookDetailCalendar from './_components/my-book-detail-calendar';

export default function MyBookDetailPage({
  params,
}: {
  params: { users_books_id: number };
}) {
  const { users_books_id } = params;

  return (
    <div className="w-full h-full overflow-scroll">
      <MyBookDetailInfo users_books_id={users_books_id} />
      <MyBookDetailCalendar users_books_id={users_books_id} />
    </div>
  );
}
