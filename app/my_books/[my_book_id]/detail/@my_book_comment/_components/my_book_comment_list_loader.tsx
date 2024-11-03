import MyBookCommentItemLoader from './my_book_comment_item_loader';

export default function MyBookCommentListLoader() {
  return (
    <div className="w-full">
      <ul className="grid grid-flow-col auto-cols-[100%] gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none">
        {Array.from({ length: 5 }).map((_, index) => (
          <MyBookCommentItemLoader key={index} />
        ))}
      </ul>
    </div>
  );
}
