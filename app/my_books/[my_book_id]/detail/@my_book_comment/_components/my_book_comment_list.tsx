'use client';

import { useMyBookComment } from '@/service/my-book-comment/useMyBookCommentService';
import MyBookCommentListLoader from './my_book_comment_list_loader';
import MyBookCommentItem from './my_book_comment_item';
import MyBookCommentEmpty from './my_book_comment_empty';
import { useEffect, useRef } from 'react';

interface ListProps {
  myBookId: number;
}

export default function MyBookCommentList({ myBookId }: ListProps) {
  const { data, isLoading } = useMyBookComment(myBookId);
  const itemRef = useRef<HTMLLIElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (itemRef.current && containerRef.current) {
      // 첫 번째 아이템의 높이를 가져와서 컨테이너 높이로 설정
      const itemHeight = itemRef.current.offsetHeight;
      containerRef.current.style.height = `${itemHeight + 10}px`;
    }
  }, [data]);

  if (isLoading || !data) return <MyBookCommentListLoader />;

  return (
    <div ref={containerRef} className="w-full relative overflow-hidden">
      <ul className="my-2 flex flex-nowrap gap-4 overflow-x-auto overflow-y-hidden scrollbar-none snap-x snap-mandatory">
        {data.length === 0 && <MyBookCommentEmpty />}
        {data?.map((item: MyBookCommentItemType, index) => (
          <li
            ref={index === 0 ? itemRef : undefined}
            className="w-full flex-shrink-0 snap-start snap-always"
            key={item.id}
          >
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
