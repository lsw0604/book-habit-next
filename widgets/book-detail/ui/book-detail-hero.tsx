import Image from 'next/image';
import { BookCardThumbnail, BookDetailDTO } from '@/entities/book';

interface BookDetailHeroProps {
  book: BookDetailDTO;
}

export function BookDetailHero({ book }: BookDetailHeroProps) {
  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      {/* 1-1. 배경용 큰 이미지 (Blur 처리) */}
      {book.coverImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={book.coverImage}
            alt="Background"
            fill
            className="object-cover blur-lg opacity-50 dark:opacity-30 scale-110" // scale-110은 blur로 인한 가장자리 흰색 번짐 방지
            priority
          />
          {/* 그라데이션 오버레이: 아래쪽으로 갈수록 자연스럽게 배경색과 섞이도록 */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-gray-900 dark:via-transparent dark:to-black/40" />
          {/* <div className="absolute inset-0 bg-black/20" /> */}
          {/* 전체적인 딤 처리 */}
        </div>
      )}

      {/* 1-2. Hero 콘텐츠 (썸네일 + 기본 정보) */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-12 md:pb-16 md:flex-row md:items-end md:gap-8">
        {/* 작은 썸네일 (포스터 역할) */}
        <div className="hidden md:block shrink-0 shadow-2xl rounded-lg overflow-hidden border border-white/20">
          {/* BookThumbnail 사용 (크기는 여기서 제어하거나 컴포넌트 props로 전달) */}
          <div className="w-48 h-72 relative">
            <BookCardThumbnail thumbnail={book.coverImage || ''} />
          </div>
        </div>

        {/* 타이틀 및 핵심 정보 */}
        <div className="flex flex-col text-center md:text-left text-gray-900 dark:text-white mb-4 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-md">
            {book.title}
          </h1>
          {book.subTitle && (
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-4 opacity-90">
              {book.subTitle}
            </p>
          )}

          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-sm md:text-base font-medium text-gray-800 dark:text-gray-300">
            <span>{book.authors.join(', ')}</span>
            <span className="hidden md:inline">|</span>
            <span>{book.publisher}</span>
            <span className="hidden md:inline">|</span>
            <span>{book.pubDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
