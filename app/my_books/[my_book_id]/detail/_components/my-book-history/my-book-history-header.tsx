import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

interface MyBookHistoryHeaderProps {
  data: ResponseGetMyBookHistory;
  myBookId: number;
}

export default function MyBookHistoryHeader({
  data,
  myBookId,
}: MyBookHistoryHeaderProps) {
  if (!data) throw Error('history의 데이터를 찾을 수 없습니다.');
  if (!myBookId) throw Error('myBookId값이 존재하지 않습니다.');

  return (
    <header className="mb-2 px-2 flex align-items text-2xl font-bold tracking-normal overflow-hidden">
      <h2 className="text-2xl font-bold inline-flex items-center">기록</h2>
      <span className="ml-2 inline-flex items-center text-gray-300 text-base tracking-normal font-normal">
        {Object.values(data).reduce((acc, cur) => acc + cur.length, 0)}
      </span>
      <div className="ml-auto text-base">
        <div className="my-3">
          <Link href={`/my_books/${myBookId}/history`}>자세히보기</Link>
        </div>
      </div>
    </header>
  );
}

MyBookHistoryHeader.Loader = function () {
  return (
    <header className="mb-2 flex align-items text-2xl font-bold tracking-normal overflow-hidden">
      <h2 className="text-2xl font-bold inline-flex items-center">기록</h2>
      <span className="ml-2 inline-flex items-center text-gray-300 text-base tracking-normal font-normal">
        <Skeleton className="ml-2 h-6 w-16" />
      </span>
      <div className="ml-auto text-base">
        <div className="my-3 ">
          <Skeleton className="ml-2 h-6 w-16" />
        </div>
      </div>
    </header>
  );
};
