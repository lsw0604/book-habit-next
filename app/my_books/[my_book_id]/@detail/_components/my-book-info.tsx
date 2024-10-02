'use client';

import Tag from '@/components/common/tag';
import { Separator } from '@/components/ui/separator';
import ImageWrapper from '@/components/common/image-wrapper';
import useBookInfo from '@/hooks/my-book-detail/useBookInfo';
import { cn } from '@/utils/class-name';

export default function MyBookInfo({ info }: { info: MyBookDetailType }) {
  const { isOpen, openHandler, createMarkup, onClickTag } = useBookInfo();

  return (
    <div className="flex flex-col">
      <div className="flex">
        <div className="flex w-full">
          <div className="relative flex-shrink-0 overflow-hidden w-[120px]">
            <ImageWrapper
              src={info.thumbnail}
              alt={info.thumbnail}
              width={120}
              height={174}
              priority
            />
          </div>
          <div className="ml-4 flex flex-col grow">
            <a
              href={info.url}
              target="_blank"
              className="font-bold line-clamp-2 text-foreground text-base mt-1 hover:underline flex items-center"
            >
              {info.title}
            </a>
            <div
              onClick={openHandler}
              className={cn(
                'text-sm font-normal text-gray-800 cursor-pointer mt-2',
                !isOpen ? 'line-clamp-6' : 'h-auto'
              )}
            >
              {info.contents === '' ? (
                '해당 책의 정보가 등록되지 않았습니다.'
              ) : (
                <p dangerouslySetInnerHTML={createMarkup(info.contents)} />
              )}
            </div>
          </div>
        </div>
      </div>
      <Separator className="mt-2" />
      <div className="flex w-full overflow-x-auto pb-2">
        <div className="overflow-auto flex gap-1 flex-nowrap w-max mt-2">
          {info.authors.map((author) => (
            <Tag
              className="whitespace-nowrap"
              key={author}
              onClick={() => onClickTag(author, 'person')}
            >
              <span className="font-bold">지은이</span> {author}
            </Tag>
          ))}
          <Tag
            className="whitespace-nowrap"
            onClick={() => onClickTag(info.publisher, 'publisher')}
          >
            <span className="font-bold">출판사</span> {info.publisher}
          </Tag>
          {info.translators.map((translator) => (
            <Tag className="whitespace-nowrap" key={translator}>
              <span className="font-bold">번역가</span> {translator}
            </Tag>
          ))}
          {info.isbn.map((isbn) => (
            <Tag
              className="whitespace-nowrap"
              key={isbn}
              onClick={() => onClickTag(isbn, 'isbn')}
            >
              <span className="font-bold">ISBN</span> {isbn}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
}
