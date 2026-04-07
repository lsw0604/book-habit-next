import type { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils';

import type { BookDetail } from '../model';

interface BookInfoListProps extends HTMLAttributes<HTMLDivElement> {
  book: Pick<
    BookDetail,
    'authors' | 'translators' | 'pubDate' | 'publisher' | 'totalPage'
  >;
  className?: string;
}

export function BookInfoList({
  className,
  book: { authors, translators, pubDate, publisher, totalPage },
  ...props
}: BookInfoListProps) {
  const infoItems = [
    { label: '작가', value: authors },
    { label: '엮은이', value: translators },
    { label: '출판일', value: pubDate },
    { label: '출판사', value: publisher },
    { label: '책 페이지', value: `${totalPage}쪽` },
  ];

  return (
    <div
      className={cn(
        'bg-gray-50 rounded-xl p-5 mb-8 space-y-3.5 text-[15px]',
        className
      )}
      {...props}
    >
      {infoItems.map(item => (
        <div key={item.label} className="flex justify-between items-center">
          <span className="text-gray-500 font-medium">{item.label}</span>
          <span className="text-gray-900 font-semibold">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
