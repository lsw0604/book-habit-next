import MyBookCommentHeader from './my-book-comment-header';
import MyBookCommentList from './my-book-comment-list';

export default function MyBookCommentLoader() {
  return (
    <section className="my-3 px-2">
      <MyBookCommentHeader.Loader />
      <MyBookCommentList.Loader />
    </section>
  );
}
