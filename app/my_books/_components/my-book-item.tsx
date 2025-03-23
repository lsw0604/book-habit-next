import type { MyBooksItem } from '@/service/api/my-book/types';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useIntersectionObserver } from 'usehooks-ts';
import { ImageIcon } from 'lucide-react';

import MyBookItemLoader from './my-book-item-loader';

import { observerOption } from '@/utils/observer-option';
import {
  MY_BOOK_ITEM_RATINGS,
  MY_BOOK_ITEM_STATUS,
} from '@/constant/my-book-item';

const STATUS_MAP = new Map(
  MY_BOOK_ITEM_STATUS.map(item => [item.status, item.label])
);

export default function MyBookItem(item: MyBooksItem) {
  const [isVisible, setIsVisible] = useState(false);
  const { id, title, thumbnail, status, rating } = item;

  const { ref, isIntersecting } = useIntersectionObserver(
    observerOption({ threshold: 0.5 })
  );

  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting, ref]);

  if (!isVisible) {
    return <MyBookItemLoader ref={ref} />;
  }

  return (
    <Link
      ref={ref}
      href={`/my_books/${id}/detail`}
      className="w-auto h-auto clear-both"
    >
      {thumbnail ? (
        <div className="mb-2 relative w-full pt-[145%] rounded-lg overflow-hidden">
          <Image
            src={thumbnail}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      ) : (
        <div className="mb-2 relative w-full pt-[145%] flex items-center justify-center bg-gray-100">
          <ImageIcon className="opacity-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3" />
        </div>
      )}
      <div className="flex flex-col px-2">
        <p className="text-sm font-bold line-clamp-1">{title}</p>
        <p className="text-sm text-black-300 line-clamp-1 flex items-center">
          {MY_BOOK_ITEM_RATINGS[rating].text}
        </p>
        <p className="text-sm text-gray-500 line-clamp-1">
          {STATUS_MAP.get(status)}
        </p>
      </div>
    </Link>
  );
}
