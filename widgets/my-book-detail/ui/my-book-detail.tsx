'use client';

import { format } from 'date-fns';
import MyBookDate from './my-book-date';
import MyBookDetailLoader from './my-book-detail-loader';
import { MyBookUpdateForm } from '@/features/update-my-book';
import {
  BookCardAuthor,
  BookCardImage,
  BookCardPublisher,
  BookCardTitle,
} from '@/entities/book';
import { useMyBook } from '@/entities/my-book/hooks';
import { createMarkUp } from '@/shared/utils/create-mark-up';
import { Separator } from '@/shared/ui/separator';

export default function MyBookDetail({ myBookId }: { myBookId: number }) {
  const { data, isLoading } = useMyBook({ myBookId });

  if (!data || isLoading) return <MyBookDetailLoader />;

  const datetime = format(data.book.datetime, 'yyyy-MM-dd');
  const { book, createdAt, updatedAt, rating, status } = data;
  const { isbns, thumbnail, title, authors, publisher, translators, contents } =
    book;

  return (
    <div className="w-full h-auto border border-gray-300 rounded-lg shadow-lg bg-transparent px-2 py-4">
      <div className="flex">
        <BookCardImage
          item={{
            isbns,
            thumbnail,
            title,
          }}
        />
        <div className="ml-3 flex flex-col grow">
          <BookCardTitle>{title}</BookCardTitle>
          <BookCardAuthor authors={authors} translators={translators} />
          <BookCardPublisher datetime={datetime} publisher={publisher} />
          <MyBookUpdateForm myBookId={myBookId} data={{ rating, status }} />
        </div>
      </div>
      <Separator className="mt-4 mb-2" />
      <div className="w-full text-sm min-h-[140px] mt-2 h-auto">
        <div className="min-h-[140px] h-auto w-full flex items-center p-1 bg-gray-100 rounded-lg">
          {data.book.contents === '' ? (
            <p className="text-gray-500 font-bold w-full text-center">
              줄거리가 존재하지 않습니다.
            </p>
          ) : (
            <p
              className="text-gray-800 fon-normal"
              dangerouslySetInnerHTML={createMarkUp(contents)}
            />
          )}
        </div>
      </div>
      <Separator className="mt-2 mb-4" />
      <MyBookDate createdAt={createdAt} updatedAt={updatedAt} />
    </div>
  );
}
