'use client';

import {
  BookCardDescription,
  BookCardThumbnail,
  type BookDetail,
} from '@/entities/book';
import { CardContent } from '@/shared/ui/card';

interface BookDetailProps {
  book: BookDetail;
  actions?: React.ReactNode;
}
/**
 * TODO 이 컴포넌트 완성시키기
 */
export function BookDetailView({ book, actions }: BookDetailProps) {
  return (
    <div className="relative">
      <div className="absolute inset-0 h-72">
        <div
          className="h-full w-full bg-cover bg-center blur-xl"
          style={{ backgroundImage: `url(${book.thumbnail})` }}
        />
      </div>
      <div className="relative container mx-auto px-4 mt-8 md:mt-12">
        <div>
          <div className="flex justify-center relative z-20">
            <div className="w-40 h-60 relative shadow-2xl rounded-lg overflow-hidden border border-white/20">
              <BookCardThumbnail thumbnail={book.thumbnail} />
            </div>
          </div>
          {actions && <div className="mt-4 flex justify-center">{actions}</div>}
          <div className="space-y-8">
            <section>
              <h3 className="text-xl font-bold mb-4 text-gray-900">책 소개</h3>
              <div className="prose prose-slate max-w-none">
                <CardContent className="px-0 min-h-[140px] w-full h-auto mb-auto flex flex-col">
                  <div className="flex-1 flex items-center justify-center p-2 bg-gray-100 rounded-lg">
                    <BookCardDescription
                      description={book.description}
                      className="text-sm text-muted-foreground h-auto"
                    />
                  </div>
                </CardContent>
              </div>
            </section>
            <section className="border-gray-200">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                상세 정보
              </h3>
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-gray-500">ISBN</dt>
                  <dd className="font-medium">{book.isbn}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">페이지</dt>
                  <dd className="font-medium">{book.totalPage}p</dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
