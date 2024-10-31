'use client';

import { useMyBookComment } from '@/service/my-book-comment/useMyBookCommentService';
import MyBookCommentListLoader from './my_book_comment_list_loader';
import MyBookCommentItem from './my_book_comment_item';

interface ListProps {
  myBookId: number;
}

export default function MyBookCommentList({ myBookId }: ListProps) {
  const { data, isLoading } = useMyBookComment(myBookId);

  if (isLoading || !data) return <MyBookCommentListLoader />;

  return (
    <ul className="max-h-96 my-2 relative overflow-auto scrollbar-none">
      {data?.map((item) => (
        <li className="w-full h-auto p-0" key={item.id}>
          <MyBookCommentItem
            {...item}
            classNames={{ content: { comment: 'line-clamp-2' } }}
          />
        </li>
      ))}
    </ul>
  );
}
