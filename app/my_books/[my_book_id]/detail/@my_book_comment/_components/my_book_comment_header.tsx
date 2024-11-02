'use client';

import Link from 'next/link';
import { useMyBookComment } from '@/service/my-book-comment/useMyBookCommentService';
import { Skeleton } from '@/components/ui/skeleton';

interface MyBookCommentHeaderProps {
  myBookId: number;
}

export default function MyBookCommentHeader({
  myBookId,
}: MyBookCommentHeaderProps) {
  const { data, isLoading } = useMyBookComment(myBookId);

  return (
    <header className="mb-2 flex align-items text-2xl font-bold tracking-normal overflow-hidden">
      <h2 className="text-2xl font-bold inline-flex items-center">코멘트</h2>
      {data || !isLoading ? (
        <span className="ml-2 inline-flex items-center text-gray-300 text-base tracking-normal font-normal">
          {data?.length}
        </span>
      ) : (
        <span className="ml-2 inline-flex items-center text-gray-300 text-base tracking-normal font-normal">
          <Skeleton className="ml-2 h-6 w-16" />
        </span>
      )}
      <div className="ml-auto text-base">
        <div className="my-3 ">
          <Link href={`/my_books/${myBookId}/comment`}>더보기 </Link>
        </div>
      </div>
    </header>
  );
}
