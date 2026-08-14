'use client';

import { ImageIcon, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

import { cn } from '@/shared/utils/class-name';

import { MyBook } from '../model';

const RATING_SCORES = [1, 2, 3, 4, 5];

interface MyBookRowProps extends HTMLAttributes<HTMLLIElement> {
  book: MyBook;
}

/** 칸반 보드처럼 폭이 좁은 영역에서 쓰는 가로형 카드 */
export function MyBookRow({ book, className, ...props }: MyBookRowProps) {
  return (
    <li className={cn('w-full', className)} {...props}>
      <Link
        href={`/my_books/${book.id}/detail`}
        className="flex gap-3 rounded-lg border border-gray-200 bg-white p-2 transition-all hover:shadow-md active:scale-[0.99]"
      >
        <div className="relative h-[68px] w-[51px] shrink-0 overflow-hidden rounded bg-gray-50">
          {book.thumbnail ? (
            <Image
              src={book.thumbnail}
              alt={`${book.title} 표지`}
              fill
              sizes="51px"
              className="object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
              <ImageIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
          )}
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
          <p className="line-clamp-2 text-sm font-bold text-gray-900">
            {book.title}
          </p>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center">
              {RATING_SCORES.map(score => (
                <Star
                  key={score}
                  className={cn(
                    'h-3 w-3',
                    score <= book.rating
                      ? 'fill-yellow-300 stroke-yellow-300'
                      : 'fill-white stroke-gray-200'
                  )}
                />
              ))}
            </div>
            {book.progressPercentage !== null && (
              <span className="text-xs font-medium text-gray-400">
                {book.progressPercentage}%
              </span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}
