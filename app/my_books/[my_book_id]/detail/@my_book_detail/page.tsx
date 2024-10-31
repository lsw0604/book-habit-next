import MyBookDetail from './_components/my-book-detail';

export default async function MyBookDetailPage({
  params,
}: {
  params: { my_book_id: number };
}) {
  return <MyBookDetail myBookId={params.my_book_id} />;
}
