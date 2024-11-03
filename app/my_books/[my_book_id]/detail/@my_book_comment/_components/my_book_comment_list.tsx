'use client';

import MyBookCommentListLoader from './my_book_comment_list_loader';
import MyBookCommentItem from './my_book_comment_item';
import MyBookCommentEmpty from './my_book_comment_empty';

interface MyBookCommentListProps {
  isLoading: boolean;
  isFetching: boolean;
  comment?: MyBookCommentItemType[];
}

export default function MyBookCommentList({
  isLoading,
  isFetching,
  comment,
}: MyBookCommentListProps) {
  if (isLoading || !comment || isFetching) return <MyBookCommentListLoader />;

  return (
    <div className="w-full">
      <ul className="grid grid-flow-col auto-cols-[100%] gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none">
        {comment.length === 0 && <MyBookCommentEmpty />}
        {comment?.map((item: MyBookCommentItemType) => (
          <li className="snap-start" key={item.id}>
            <MyBookCommentItem
              {...item}
              classNames={{ content: { comment: 'line-clamp-2' } }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
