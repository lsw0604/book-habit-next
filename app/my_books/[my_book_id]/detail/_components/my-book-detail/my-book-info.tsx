import { cn } from '@/utils/class-name';

import { Separator } from '@/components/ui/separator';
import ImageWrapper from '@/components/common/image-wrapper';
import { createMarkUp } from '@/utils/create-mark-up';
import { ReactNode, useCallback, useState } from 'react';

interface MyBookInfoProps {
  data: Pick<ResponseGetMyBookDetail, 'book' | 'tag'>;
  children: ReactNode;
}

interface BookContentProps {
  content: string;
}

function BookContent({ content }: BookContentProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openHandler = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div
      onClick={openHandler}
      className={cn(
        'text-sm font-normal text-gray-800 cursor-pointer mt-2',
        !isOpen ? 'line-clamp-3' : 'h-auto'
      )}
    >
      {content === '' ? (
        '해당 책의 정보가 등록되지 않았습니다.'
      ) : (
        <p dangerouslySetInnerHTML={createMarkUp(content)} />
      )}
    </div>
  );
}

/**
 * TODO: 컴포넌트 분리 좀 더 고민해보기
 */

export default function MyBookInfo({ data, children }: MyBookInfoProps) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex w-full">
          <div className="relative flex-shrink-0 overflow-hidden w-[120px]">
            <ImageWrapper
              src={data.book.thumbnail}
              alt={data.book.thumbnail}
              width={120}
              height={174}
              priority
            />
          </div>
          <div className="ml-4 flex flex-col grow">
            <a
              href={data.book.url}
              target="_blank"
              className="font-bold line-clamp-2 text-foreground text-base mt-1 hover:underline flex items-center"
            >
              {data.book.title}
            </a>
            <p>
              지은이{' '}
              {data.book.authors.map((author) => (
                <span key={author}>{author}</span>
              ))}
            </p>
            <p>출판사 {data.book.publisher}</p>
            <BookContent content={data.book.contents} />
          </div>
        </div>
      </div>
      <Separator className="mt-2" />
      {children}
    </div>
  );
}
