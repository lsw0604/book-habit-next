'use client';

import type { MyBookItemProps } from '../model';
import Link from 'next/link';
import Image from 'next/image';
import { ImageIcon, Star } from 'lucide-react';
import { useStatusOptions } from '@/entities/my-book/ui';
import { cn } from '@/shared/utils/class-name';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui/tooltip';

export default function MyBookItem({ book, className }: MyBookItemProps) {
  const { getStatusLabel } = useStatusOptions();

  return (
    <li className={cn('w-full', className)}>
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
                className={cn('object-cover')}
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
          <div className="grid grid-cols-5 w-3/4">
            {Array.from({ length: book.rating }).map((_, idx) => (
              <i key={`rating-${idx}`}>
                <Star className="stroke-yellow-300 fill-yellow-300 w-full h-auto" />
              </i>
            ))}
            {Array.from({ length: 5 - book.rating }).map((_, idx) => (
              <i key={`un-rating-${idx}`}>
                <Star className="stroke-gray-200 fill-white w-full h-auto" />
              </i>
            ))}
          </div>
          <p className="font-semibold text-xs text-gray-500 mt-1">
            {getStatusLabel(book.status)}
          </p>
        </div>
      </Link>
    </li>
  );
}
