import MyBookHistoryList from './_components/my-book-history-list';

export default async function MyBookHistoryPage({
  params,
}: {
  params: { my_book_id: string };
}) {
  const { my_book_id } = params;
  const myBookId = parseInt(my_book_id, 10);

  return <MyBookHistoryList myBookId={myBookId} />;
}
