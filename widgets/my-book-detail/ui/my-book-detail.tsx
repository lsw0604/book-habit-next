'use client';

import {
  BookCardAuthor,
  BookCardContent,
  BookCardImage,
  BookCardPublisher,
  BookCardTitle,
} from '@/entities/book';
import { useMyBook } from '@/entities/my-book/hooks';
import { MyBookUpdateForm } from '@/features/update-my-book';
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';

import { MyBookDetailDate } from './my-book-detail-date';
import { MyBookDetailLoader } from './my-book-detail-loader';

export function MyBookDetail({ myBookId }: { myBookId: number }) {
  const { data, isLoading } = useMyBook({ myBookId });

  if (!data || isLoading) return <MyBookDetailLoader />;

  return (
    <Card className="px-2 py-4 border-gray-300 gap-0">
      <div className="flex">
        <BookCardImage
          thumbnail={data.book.thumbnail}
          isbns={data.book.isbns}
        />
        <CardContent className="ml-3 p-0 flex-grow flex flex-col gap-2">
          <CardTitle>
            <BookCardTitle title={data.book.title} />
          </CardTitle>
          <CardDescription>
            <BookCardAuthor
              authors={data.book.authors}
              translators={data.book.translators}
            />
            <BookCardPublisher
              datetime={data.book.datetime}
              publisher={data.book.publisher}
            />
          </CardDescription>
          <MyBookUpdateForm myBookId={myBookId} data={data} />
        </CardContent>
      </div>
      <Separator className="mt-4 mb-2" />
      <CardContent className="p-0 min-h-[140px] w-full h-auto">
        <div className="min-h-[140px] w-full flex items-center justify-center p-2 bg-gray-100 rounded-lg">
          <BookCardContent bookContent={data.book.contents} />
        </div>
      </CardContent>
      <MyBookDetailDate data={data} />
    </Card>
  );
}
