'use client';

import { ImageIcon, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip';
import { cn } from '@/shared/utils/class-name';

import { getStatusLabel } from '../lib';
import { MyBook } from '../model';

interface MyBookItemProps extends HTMLAttributes<HTMLLIElement> {
  book: MyBook;
}

export function MyBookItem({ book, className, ...props }: MyBookItemProps) {
  return (
    <li className={cn('w-full', className)} {...props}>
      <Link
        href={`/my_books/${book.id}/detail`}
        className={cn('block relative overflow-hidden rounded-lg')}
      >
        <div className="relative overflow-hidden rounded-md bg-gray-50">
          <div className="aspect-[3/4] w-full">
            {book.thumbnail ? (
              <Image
                src={book.thumbnail}
                alt={`${book.title} 표지`}
                fill
                sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, (max-width: 1024px) 20vw, (max-width: 1280px) 16vw, (max-width: 1536px) 14vw, 10vw"
                className="object-cover"
                loading="lazy" // 무한 스크롤 고려
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                <ImageIcon
                  className="h-6 w-6 text-gray-400 sm:h-8 sm:w-8"
                  aria-hidden="true"
                />
              </div>
            )}
            <div className="absolute top-2 left-1 text-xs">
              <div className="w-full h-auto mb-2">
                <span className="px-2 py-1 rounded font-bold text-primary-foreground bg-primary opacity-70">
                  {getStatusLabel(book.status)}
                </span>
              </div>
              <div className="px-2 py-1 rounded bg-primary opacity-70 w-3/5">
                <div className="grid grid-cols-5 w-full">
                  {Array.from({ length: book.rating }).map((_, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <i key={`rating-${idx}`}>
                      <Star className="stroke-yellow-300 fill-yellow-300 w-full h-auto" />
                    </i>
                  ))}
                  {Array.from({ length: 5 - book.rating }).map((_, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <i key={`un-rating-${idx}`}>
                      <Star className="stroke-gray-200 fill-white w-full h-auto" />
                    </i>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start mt-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="font-bold text-base line-clamp-1">{book.title}</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{book.title}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Link>
    </li>
  );
}
