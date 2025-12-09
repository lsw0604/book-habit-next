'use client';



import {
  BookCardDescription,
  BookCardThumbnail,
  useAladinBookSearch,
} from '@/entities/book';
import { BookDetailHero } from './book-detail-hero';

interface MyBookDetailProps {
  isbn: string;
}

export function MyBookDetail({ isbn }: MyBookDetailProps) {
  const { data: book, isLoading, isError, error } = useAladinBookSearch(isbn);

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  if (isError)
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        {error?.message}
      </div>
    );
  if (!book)
    return (
      <div className="h-screen flex items-center justify-center">정보 없음</div>
    );

  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 pb-20">
      {/* 1. Hero Background Section (왓챠 스타일 배경) */}
      <BookDetailHero book={book} />

      {/* 2. Body Content (스크롤 내리면 보이는 상세 내용) */}
      <div className="container mx-auto px-4 mt-8 md:mt-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* 모바일에서만 보이는 썸네일 (필요하다면) */}
          <div className="md:hidden flex justify-center -mt-20 relative z-20 mb-6">
            <div className="w-40 h-60 relative shadow-2xl rounded-lg overflow-hidden border border-white/20">
              <BookCardThumbnail thumbnail={book.thumbnail || ''} />
            </div>
          </div>

          {/* 좌측 상세 정보 */}
          <div className="md:col-span-8 lg:col-span-9 space-y-8">
            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                책 소개
              </h3>
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <BookCardDescription description={book.description} />
              </div>
            </section>

            {/* 추가 섹션 (리뷰, 목차 등)이 들어갈 자리 */}
            <section className="pt-8 border-t border-gray-200 dark:border-gray-800">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                상세 정보
              </h3>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-gray-500">ISBN</dt>
                  <dd className="font-medium">{isbn}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">페이지</dt>
                  <dd className="font-medium">{book.totalPage}p</dd>
                </div>
              </dl>
            </section>
          </div>

          {/* 우측 사이드바 (구매 버튼, 액션 버튼 등) */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="sticky top-24 space-y-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
