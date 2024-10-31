import MyBookCommentHeader from './_components/my_book_comment_header';
import MyBookCommentList from './_components/my_book_comment_list';

export default function MyBookCommentPage({
  params,
}: {
  params: { my_book_id: number };
}) {
  return (
    <section className="my-3 px-2">
      <MyBookCommentHeader myBookId={params.my_book_id} />
      <MyBookCommentList myBookId={params.my_book_id} />
    </section>
  );
}
