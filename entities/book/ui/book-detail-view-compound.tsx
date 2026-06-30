import { CardTitle } from '@/shared/ui/card';

import type { BookDetail } from '../model';
import { BookInfoList } from './book-info-list';
import { BookCardThumbnail } from './book-card-thumbnail';
import { BookCardDescription } from './book-card-description';

interface BookDetailViewCompoundProps {
  children: React.ReactNode;
}

export function BookDetailViewCompound({
  children,
}: BookDetailViewCompoundProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-white px-4 py-6 items-center flex flex-col">
      {children}
    </div>
  );
}

BookDetailViewCompound.Thumbnail = function BookDetailThumbnail({
  coverImage,
  title,
}: {
  coverImage: string | null;
  title: string;
}) {
  return (
    <div className="w-[250px] h-[348px] flex-shrink-0 mb-6 rounded-lg shadow-lg overflow-hidden">
      <BookCardThumbnail
        src={coverImage}
        alt={`${title} 썸네일`}
      />
    </div>
  );
};

BookDetailViewCompound.MainInfo = function BookDetailMainInfo({
  title,
  authors,
  translators,
  pubDate,
  publisher,
  totalPage,
}: {
  title: string;
  authors: string;
  translators?: string;
  pubDate: string;
  publisher: string;
  totalPage: string;
}) {
  return (
    <div className="w-full text-center mb-4">
      <CardTitle className="mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
      </CardTitle>
      <BookInfoList
        authors={authors}
        translators={translators}
        pubDate={pubDate}
        publisher={publisher}
        totalPage={totalPage}
      />
    </div>
  );
};

BookDetailViewCompound.Actions = function BookDetailActions({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8 w-full">
      {children}
    </div>
  );
};

BookDetailViewCompound.Description = function BookDetailDescription({
  description,
}: {
  description: string;
}) {
  return (
    <div className="w-full mt-4">
      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        책 상세 정보
      </h3>
      <div className="bg-gray-100 border border-gray-100 rounded-xl p-4">
        <BookCardDescription
          className="min-h-20 h-auto text-gray-700 leading-relaxed text-[15px] break-keep"
          description={description}
        />
      </div>
    </div>
  );
};
