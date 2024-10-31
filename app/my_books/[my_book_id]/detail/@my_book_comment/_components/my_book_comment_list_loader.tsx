import MyBookCommentItemLoader from './my_book_comment_item_loader';

export default function MyBookCommentListLoader() {
  return (
    <ul className="overflow-auto scrollbar-none">
      {Array.from({ length: 5 }).map((_, index) => (
        <MyBookCommentItemLoader key={index} />
      ))}
    </ul>
  );
}
