import ImageWrapper from '@/components/common/image-wrapper';
import { Skeleton } from '@/components/ui/skeleton';
import dayjs from 'dayjs';
import Link from 'next/link';

interface MyBookItemProps {
  item: MyBookListInfinityQueryItemType;
}

export default function MyBookItem({ item }: MyBookItemProps) {
  const { date, id, isbn, thumbnail, title, status } = item;

  const datetime = dayjs(date).add(9, 'hour').format('YYYY MM DD');

  return (
    <li className="w-full h-auto p-4 rounded-lg shadow-lg">
      <Link href={`/my_books/${id}`}>
        <div className="flex justify-center mb-2">
          <ImageWrapper
            src={thumbnail}
            alt={isbn}
            width={120}
            height={174}
            priority
          />
        </div>
        <div className="w-full h-auto">
          <p className="text-lg text-ellipsis overflow-hidden whitespace-nowrap">
            {title}
          </p>
          <p className="text-sm">{status ? status : '상태 없음'}</p>
          <p className="text-sm">📅&nbsp;{date ? datetime : '❌'}</p>
        </div>
      </Link>
    </li>
  );
}

MyBookItem.Loader = function () {
  return (
    <div className="w-full h-auto p-4 rounded-lg shadow-lg">
      <div className="flex justify-center mb-2">
        <Skeleton className="w-[120px] h-[174px] rounded-lg bg-slate-200" />
      </div>
      <div className="w-full h-auto">
        <Skeleton className="w-full h-[26px] rounded-lg bg-slate-200 mb-1" />
        <Skeleton className="w-[50px] h-[18px] rounded-lg bg-slate-200 mb-1" />
        <Skeleton className="w-[100px] h-[18px] rounded-lg bg-slate-200 mb-1" />
      </div>
    </div>
  );
};
