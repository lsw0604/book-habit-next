import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { StarIcon, ImageIcon } from 'lucide-react';

import { Skeleton } from '@/components/ui/skeleton';
import { OBSERVER_OPTION } from '@/constant/observer-option';
import {
  MY_BOOK_ITEM_RATINGS,
  MY_BOOK_ITEM_STATUS,
} from '@/constant/my-book-item';

export default function MyBookItem(item: ResponseGetMyBookItemType) {
  const { id, title, thumbnail, status, rating } = item;
  const [isLoading, setIsLoading] = useState(true);
  const { ref, isIntersecting } = useIntersectionObserver(OBSERVER_OPTION);

  useEffect(() => {
    if (isIntersecting) {
      setIsLoading(false);
    }
  }, [isIntersecting]);

  return (
    <Link
      ref={ref}
      href={`/my_books/${id}`}
      className="w-auto h-auto clear-both"
    >
      {isLoading ? (
        <MyBookItem.Loader />
      ) : (
        <>
          {thumbnail ? (
            <div className="mb-2 relative w-full pt-[145%] rounded-lg overflow-hidden">
              <Image
                src={thumbnail}
                alt={id.toString()}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
          ) : (
            <div className="mb-2 relative w-full pt-[145%] flex items-center justify-center bg-gray-100">
              <ImageIcon className="fill-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 h-1/3" />
            </div>
          )}
          <div className="flex flex-col px-2">
            <p className="text-sm font-bold line-clamp-1">{title}</p>
            <p className="text-sm text-yellow-300 line-clamp-1 flex items-center">
              <StarIcon className="w-4 h-4 mr-1 fill-yellow-300" />
              {MY_BOOK_ITEM_RATINGS[rating].text}
            </p>
            <p className="text-sm text-gray-500 line-clamp-1">
              {MY_BOOK_ITEM_STATUS.find((item) => item.status === status)?.text}
            </p>
          </div>
        </>
      )}
    </Link>
  );
}

MyBookItem.Loader = function () {
  return (
    <li className="w-auto h-auto p-1">
      <Skeleton className="w-full relative mb-2 pt-[145%] h-4 rounded-lg overflow-hidden bg-gray-200" />
      <div className="flex flex-col px-2">
        <Skeleton className="w-full h-4 mb-1 bg-gray-200" />
        <Skeleton className="w-2/3 h-4 mb-1 bg-gray-200" />
        <Skeleton className="w-1/2 h-4 bg-gray-200" />
      </div>
    </li>
  );
};
