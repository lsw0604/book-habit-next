'use client';

import { BookViewCompound, useFetchBookDetail } from '@/entities/book';

import { SearchedBookActions } from './searched-book-actions';

interface SearchedBookDetailProps {
  isbn: string;
}


export function SearchedBookDetail({ isbn }: SearchedBookDetailProps) {
  const { data, isLoading, isError } = useFetchBookDetail(isbn);

  // TODO 로딩일 때 스켈레톤, 에러일 때 에러 컴포넌트 만들기
  if (isLoading) {
    return <div className="min-h-full flex-1 animate-pulse bg-background" />;
  }
  if (isError || !data) return null;
  
  return (
    <div className='p-2'>
      <BookViewCompound>
        <BookViewCompound.Thumbnail
          coverImage={data.coverImage}
          title={data.title}
          />
        <BookViewCompound.MainInfo
          title={data.title}
          authors={data.authors}
          translators={data.translators}
          pubDate={data.pubDate}
          publisher={data.publisher}
          totalPage={data.totalPage}
          />
        <BookViewCompound.Actions>
          <SearchedBookActions isbn={isbn} />
        </BookViewCompound.Actions>
        <BookViewCompound.Description
          description={data.description}
          />
      </BookViewCompound>
    </div>
  );
}
