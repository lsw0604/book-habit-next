'use client';

import { BookViewCompound } from '@/entities/book';
import { useMyBook } from '@/entities/my-book';
import { UpdateMyBookAction } from '@/features/update-my-book';

import { MyBookDetailLoader } from './my-book-detail-loader';

export function MyBookDetail({ myBookId }: { myBookId: number }) {
  const { data, isLoading } = useMyBook(myBookId);

  if (!data || isLoading) return <MyBookDetailLoader />;

  return (
    <BookViewCompound>
      <BookViewCompound.Thumbnail
        coverImage={data.book.thumbnail}
        title={data.book.title}
      />
      <BookViewCompound.MainInfo
        title={data.book.title}
        authors={data.book.authors}
        translators={data.book.translators}
        pubDate={data.book.pubDate}
        publisher={data.book.publisher}
        totalPage={data.book.totalPage}
      />
      <BookViewCompound.Actions>
        <UpdateMyBookAction data={data} />
      </BookViewCompound.Actions>
      <BookViewCompound.Description description={data.book.description ?? ''} />
    </BookViewCompound>
  );
}
