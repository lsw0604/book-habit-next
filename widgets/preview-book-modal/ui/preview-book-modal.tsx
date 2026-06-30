'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import {
  BookCardDescription,
  BookCardThumbnail,
} from '@/entities/book';
import { useModal, type PreviewBookProps } from '@/entities/modal';
import { Button } from '@/shared/ui/button';

export function PreviewBookModal({ bookSummary }: PreviewBookProps) {
  const router = useRouter();
  const { close } = useModal();

  const handleNavigate = useCallback(() => {
    router.push(`/book/${bookSummary.isbn}`);
    close();
  }, [router, close, bookSummary.isbn]);

  return (
    <div className="p-3 flex flex-col gap-2">
      <div className="flex flex-row items-start gap-4">
        <div className="w-[120px] h-[174px] flex-shrink-0">
          <BookCardThumbnail src={bookSummary.thumbnail} alt={bookSummary.title} />
        </div>
        <div className="h-[174px] w-full flex flex-col">
          <h2 className="text-lg font-bold mb-2 text-gray-900">
            {bookSummary.title}
          </h2>
          <div className="text-xs text-gray-500 space-y-1">
            <span className="flex gap-1 font-medium">
              <span className="line-clamp-1 break-all">{bookSummary.authors}</span>
              {bookSummary.translators !== '-' && (
                <>
                  {' | '}
                  <span className="line-clamp-1 break-all">{bookSummary.translators}</span>
                </>
              )}
            </span>
            <p className="line-clamp-1 break-all font-medium">{bookSummary.publisher}</p>
            <p className="line-clamp-1 break-all font-medium">{bookSummary.pubDate}</p>
            {bookSummary.status !== '정상판매' && (
              <div className="flex items-baseline gap-1 mt-1 mb-1">
                <span className="bg-black text-[10px] px-2 py-0.5 font-semibold text-white rounded">
                  절판
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="px-0 min-h-[140px] w-full h-auto mb-auto flex flex-col">
        <div className="flex-1 flex items-center justify-center p-2 bg-gray-100 rounded-lg">
          <BookCardDescription
            description={bookSummary.description}
            className="text-sm text-muted-foreground h-auto"
          />
        </div>  
      </div>
      <div className="px-0">
        <div className="pb-3 w-full">
          <Button type="button" className="w-full" onClick={handleNavigate}>
            상세페이지로 이동하기
          </Button>
        </div>
      </div>
    </div>
  );
}
