export default function HistoryPage({
  params,
}: {
  params: { my_book_id: string };
}) {
  return <div>MyBookId : {params.my_book_id}</div>;
}
