import { CardTitle } from '@/shared/ui/card';

import { BookCardDescription } from './book-card-description';
import { BookCardThumbnail } from './book-card-thumbnail';
import { BookInfoList } from './book-info-list';

interface BookViewCompoundProps {
  children: React.ReactNode;
}

export function BookViewCompound({ children }: BookViewCompoundProps) {
  return (
    // overflow-y-auto를 두지 않는다. 부모에 확정 높이가 없어 발동한 적도 없는 죽은 스타일이었고,
    // 스크롤은 이 컴포넌트를 담는 쪽(상세 페이지의 컬럼, main)이 담당해야 한다.
    <div className="flex-1 bg-white p-2 items-center flex flex-col">
      {children}
    </div>
  );
}

BookViewCompound.Thumbnail = function BookDetailThumbnail({
  coverImage,
  title,
}: {
  coverImage: string | null;
  title: string;
}) {
  return (
    <div className="w-[250px] h-[348px] flex-shrink-0 mb-6 rounded-lg shadow-lg overflow-hidden">
      <BookCardThumbnail src={coverImage} alt={`${title} 썸네일`} />
    </div>
  );
};

BookViewCompound.MainInfo = function BookDetailMainInfo({
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

BookViewCompound.Actions = function BookDetailActions({
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

BookViewCompound.Description = function BookDetailDescription({
  description,
}: {
  description: string;
}) {
  return (
    <div className="w-full mt-4">
      <h3 className="text-lg font-bold text-gray-900 mb-3">책 상세 정보</h3>
      <div className="bg-gray-100 border border-gray-100 rounded-xl p-4">
        <BookCardDescription
          className="min-h-20 h-auto text-gray-700 leading-relaxed text-[15px] break-keep"
          description={description}
        />
      </div>
    </div>
  );
};
