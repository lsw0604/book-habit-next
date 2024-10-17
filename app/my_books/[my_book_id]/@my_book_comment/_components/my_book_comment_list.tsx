'use client';

import useMyBookCommentQuery from '@/queries/my-book-comment/useMyBookCommentQuery';
import MyBookCommentItem from './my_book_comment_item';
import { useState } from 'react';

export default function MyBookCommentList({
  my_book_id,
}: {
  my_book_id: number;
}) {
  const [item, setItem] = useState<MyBookCommentItemType>();
  const { data, isLoading } = useMyBookCommentQuery({ myBookId: my_book_id });

  if (!data || isLoading) return null;

  return (
    <ul className="overflow-auto flex-1">
      {data.map((item) => (
        <li key={item.id} className="w-full h-auto p-0">
          <MyBookCommentItem {...item} />
        </li>
      ))}
    </ul>
  );
}
