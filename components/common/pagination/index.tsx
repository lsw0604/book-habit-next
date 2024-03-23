'use client';

import { cn } from '@/lib/utils';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface PaginationProps {
  totalPage: number;
  page: number;
  nextPage?: number;
  prevPage?: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  totalPage,
  page,
  nextPage,
  prevPage,
  setPage,
}: PaginationProps) {
  const nextPageHandler = () => {
    if (nextPage && page < nextPage) {
      setPage(nextPage);
    }
  };

  const prevPageHandler = () => {
    if (prevPage && page > prevPage) {
      setPage(prevPage);
    }
  };

  const pageHandler = (toPage: number) => {
    if (page !== toPage) {
      setPage(toPage);
    }
  };

  return (
    <div className="w-full h-10 flex justify-evenly items-center">
      <ArrowLeftIcon onClick={prevPageHandler} />
      <div className="flex justify-center items-center gap-4">
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((a) => (
          <p
            className={cn(
              'flex justify-center items-center text-sm',
              a === page && 'text-white'
            )}
            onClick={() => pageHandler(a)}
            key={a}
          >
            {a}
          </p>
        ))}
      </div>
      <ArrowRightIcon onClick={nextPageHandler} />
    </div>
  );
}
