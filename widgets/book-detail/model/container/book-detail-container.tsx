'use client';

import { useQuery } from '@tanstack/react-query';
import { Book, BookmarkPlus, BookOpen, PenLine } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAladinBookSearch } from '@/entities/book';
import { MyBook, myBookService, MyBookStatus } from '@/entities/my-book';
import { userSelector } from '@/entities/user';
import { useAppSelector } from '@/shared/redux';
import { useAutoSubmit } from '@/shared/hooks';
import { Button } from '@/shared/ui/button';
import { ModeOption, ModeSwitch } from '@/shared/ui/mode-switch';

import { BookDetailView } from '../../ui';
import { AddReadingButton } from '@/features/update-my-book-status';
import { Rating } from '@/shared/ui/rating';

const useExistMyBook = (isbn: string, enabled: boolean) =>
  useQuery({
    queryKey: ['exist-my-book', isbn],
    queryFn: () => myBookService.isExistMyBook({ isbn }),
    staleTime: 0,
    gcTime: 0,
    enabled,
  }); // TODO: API 연동

function BookDetailActions({ isbn }: { isbn: string }) {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector(userSelector);
  const { data: isExist } = useExistMyBook(isbn, isAuthenticated);
  const [rate, setRate] = useState<number>(0);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-200 gap-3 text-center">
        <p className="text-sm text-gray-500 font-medium leading-relaxed">
          독서 기록을 남기고 관리하려면<br />로그인이 필요합니다.
        </p>
        <Button 
          type="button" 
          size="sm" 
          onClick={() => router.push('/login')}
          className="font-semibold"
        >
          로그인하러 가기
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-3 gap-2">
        <AddReadingButton isbn={isbn} />
        <button
          type="button"
          className="flex flex-col items-center justify-center py-3 rounded-xl border transition-all border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
        >
          <BookOpen size={22} className="mb-1.5" />
          <span className="text-xs font-bold">보는중</span>
        </button>

        <button
          type="button"
          className="flex flex-col items-center justify-center py-3 rounded-xl border bg-white text-gray-700 border-gray-200 hover:bg-gray-50 transition-all"
        >
          <PenLine size={22} className="mb-1.5" strokeWidth={1.5} />
          <span className="text-xs font-bold">리뷰 남기기</span>
        </button>
      </div>
      <div className="w-full bg-gray-100 p-4 rounded-xl">
        <Rating rating={rate} onChange={(value) => setRate(value)} />
      </div>
    </div>
  );
}

export function BookDetailContainer({ isbn }: { isbn: string }) {
  const { data, isLoading, isError } = useAladinBookSearch(isbn);

  if (data)
    return (
      <BookDetailView book={data} actions={<BookDetailActions isbn={isbn} />} />
    );

  if (isLoading) {
    // TODO: Add Skeleton UI
    return <div className="min-h-screen bg-background animate-pulse" />;
  }

  if (isError) {
    return null; // Or Error Component
  }
}
