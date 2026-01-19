'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import {
  BookCardAuthor,
  BookCardDescription,
  BookCardThumbnail,
  BookCardPubDate,
  BookCardPublisher,
  BookCardStatus,
  BookCardTranslator,
} from '@/entities/book';
import { useModal, type PreviewBookProps } from '@/entities/modal';
import { Button } from '@/shared/ui/button';
import {
  CardContent,
  CardFooter,
  CardDescription,
  CardTitle,
  Card,
} from '@/shared/ui/card';

export function PreviewBookModal({ bookSummary }: PreviewBookProps) {
  const router = useRouter();
  const { close } = useModal();

  const handleNavigate = useCallback(() => {
    router.push(`/book/${bookSummary.isbn}`);
    close();
  }, [router, close, bookSummary.isbn]);

  return (
    <Card className="shadow-none border-none p-3 gap-2">
      <div className="flex flex-row items-start gap-4">
        <div className="w-[120px] h-[174px] flex-shrink-0">
          <BookCardThumbnail thumbnail={bookSummary.thumbnail} />
        </div>
        <div className="h-[174px] w-full flex flex-col">
          <CardTitle className="text-lg font-bold mb-2">
            {bookSummary.title}
          </CardTitle>
          <CardDescription className="text-xs">
            <span className="mb-2 flex flex-row gap-1">
              <BookCardAuthor authors={bookSummary.authors} />
              {bookSummary.translators.length !== 0 && '|'}
              <BookCardTranslator translators={bookSummary.translators} />
            </span>
            <BookCardPublisher
              className="mb-2"
              publisher={bookSummary.publisher}
            />
            <BookCardPubDate className="mb-2" pubDate={bookSummary.pubDate} />
            <BookCardStatus status={bookSummary.status} />
          </CardDescription>
        </div>
      </div>
      <CardContent className="px-0 min-h-[140px] w-full h-auto mb-auto flex flex-col">
        <div className="flex-1 flex items-center justify-center p-2 bg-gray-100 rounded-lg">
          <BookCardDescription
            description={bookSummary.description}
            className="text-sm text-muted-foreground h-auto"
          />
        </div>
      </CardContent>
      <CardFooter className="px-0">
        <div className="pb-3 w-full">
          <Button type="button" className="w-full" onClick={handleNavigate}>
            상세페이지로 이동하기
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
