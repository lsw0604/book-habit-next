'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { MyBookItemProps } from '../model/types';
import { getBookRatingText, getBookStatusLabel } from '@/entities/my-book/lib';

export default function MyBookItem({ book }: MyBookItemProps) {
  return (
    <Link
      href={`/my_books/${book.id}/detail`}
      className="w-auto h-auto clear-both:"
    >
      {book.thumbnail ? (
        <div className="mb-2 relative w-full pt-[145%] rounded-lg overflow-hidden">
          <Image
            src={book.thumbnail}
            alt={book.title}
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
        <p className="text-sm font-bold line-clamp-1">{book.title}</p>
        <p className="text-sm text-black-300 line-clamp-1 flex items-center">
          {getBookRatingText(book.rating)}
        </p>
        <p className="text-sm text-gray-500 line-clamp-1">
          {getBookStatusLabel(book.status)}
        </p>
      </div>
    </Link>
  );
}
