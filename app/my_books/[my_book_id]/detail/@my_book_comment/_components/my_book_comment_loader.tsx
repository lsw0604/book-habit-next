import MyBookCommentHeaderLoader from './my_book_comment_header_loader';
import MyBookCommentListLoader from './my_book_comment_list_loader';

export default function MyBookCommentLoader() {
  return (
    <section>
      <MyBookCommentHeaderLoader />
      <MyBookCommentListLoader />
    </section>
  );
}
