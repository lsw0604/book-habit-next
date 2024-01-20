'use client';

import dayjs from 'dayjs';
import SearchItemHeader from './search-item-header';

interface SearchItemContentProps {
  content: Omit<
    KakaoSearchResponseDocumentType,
    'contents' | 'url' | 'isbn' | 'thumbnail'
  >;
  search: string;
}

export default function SearchItemContent({
  content,
  search,
}: SearchItemContentProps) {
  const {
    price,
    publisher,
    authors,
    datetime,
    sale_price,
    status,
    title,
    translators,
  } = content;

  const date = dayjs(datetime).format('YYYY년 MM월');

  return (
    <div className="w-full h-full">
      <SearchItemHeader title={title} search={search} />
      <div className="text-[10px] leading-3 w-full inline-flex gap-2 font-bold overflow-hidden">
        출판사{' '}
        <p className="text-[10px] leading-3 overflow-hidden">{publisher}</p>
      </div>
      <div className="text-[10px] leading-3 w-full inline-flex gap-2 font-bold overflow-hidden">
        작가{' '}
        {authors &&
          authors.map((author) => (
            <p key={author} className="text-[10px] leading-3 overflow-hidden">
              {author}
            </p>
          ))}
      </div>
      <div className="text-[10px] leading-3 w-full inline-flex gap-2 font-bold overflow-hidden">
        번역
        {translators && translators.length !== 0 ? (
          translators.map((translator) => (
            <p
              key={translator}
              className="text-[10px] leading-3 overflow-hidden"
            >
              {translator}
            </p>
          ))
        ) : (
          <p className="text-[10px] leading-3 overflow-hidden">미상</p>
        )}
      </div>
      <div className="text-[10px] leading-3 w-full inline-flex gap-2 font-bold overflow-hidden">
        판매가
        <p className="text-[10px] leading-3 overflow-hidden">{price}</p>/
        <p className="text-[10px] leading-3 overflow-hidden line-through">
          {sale_price}
        </p>
      </div>
      <div className="text-[10px] leading-3 w-full inline-flex gap-2 font-bold overflow-hidden">
        판매상태
        <p className="text-[10px] leading-3 overflow-hidden">{status}</p>
      </div>
      <div className="text-[10px] leading-3 w-full inline-flex gap-2 font-bold overflow-hidden">
        출판
        <p className="text-[10px] leading-3 overflow-hidden">{date}</p>
      </div>
    </div>
  );
}
