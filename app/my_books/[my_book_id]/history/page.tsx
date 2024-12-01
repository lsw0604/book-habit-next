export default function MyBookHistoryPage({
  params,
}: {
  params: { my_book_id: string };
}) {
  return <div>{params.my_book_id}History</div>;
}
