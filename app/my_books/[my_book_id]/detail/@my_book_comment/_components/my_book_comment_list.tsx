'use client';

import MyBookCommentItem from './my_book_comment_item';
import MyBookCommentEmpty from './my_book_comment_empty';

interface MyBookCommentListProps {
  comment: MyBookCommentItemType[];
}

export default function MyBookCommentList({ comment }: MyBookCommentListProps) {
  if (!comment) throw Error('comment Data값을 찾을 수 없습니다.');

  return (
    <div className="w-full">
      <ul className="grid grid-flow-col auto-cols-[100%] gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none">
        {comment.length === 0 ? (
          <MyBookCommentEmpty />
        ) : (
          comment?.map((item: MyBookCommentItemType) => (
            <li className="snap-start h-[264px]" key={item.id}>
              <MyBookCommentItem
                {...item}
                classNames={{ content: { comment: 'line-clamp-2' } }}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
