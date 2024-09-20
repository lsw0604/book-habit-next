import dayjs from 'dayjs';
import ImageWrapper from '@/components/common/image-wrapper';
import { Skeleton } from '@/components/ui/skeleton';

interface SearchItemProps {
  item: KakaoDocument;
}

export default function SearchItem({ item }: SearchItemProps) {
  const author = (authors: string[]) => {
    if (authors.length === 0) {
      return '미상';
    } else if (authors.length === 1) {
      return authors[0];
    } else {
      return `${authors[0]} 외 ${authors.length - 1}명`;
    }
  };

  const isbn = (isbn: string) => {
    const isbns = isbn.split(' ');
    if (isbns.length === 1) return isbns[0];
    return `${isbns[0]} ${isbns[1]}`;
  };

  const price = ({
    price,
    sale_price,
  }: {
    price: number;
    sale_price: number;
  }) => {
    if (sale_price < 0) {
      return;
    }

    return `${(1 - Math.floor(sale_price / price)) * 10}%`;
  };

  const datetime = dayjs(item.datetime);

  return (
    <div className="w-full h-auto p-4 rounded-2xl border-[none] shadow-lg clear-both">
      <div className="flex">
        <div className="flex w-full">
          <div className="relative flex-shrink-0 overflow-hidden w-[120px]">
            <ImageWrapper
              src={item.thumbnail}
              alt={item.thumbnail}
              width={120}
              height={174}
            />
          </div>
          <div className="ml-4 flex flex-col grow">
            <span className="font-bold line-clamp-2 text-foreground text-base mt-1 hover:underline">
              {item.title}
            </span>
            <div className="line-clamp-1 flex overflow-hidden whitespace-normal break-all text-xxs text-gray-700">
              {isbn(item.isbn)}
            </div>
            <div className="line-clamp-2 flex overflow-hidden whitespace-normal break-all text-sm text-gray-800 my-1">
              {author(item.authors)} | {item.publisher}
            </div>
            <div className="flex flex-row flex-wrap place-items-center items-center justify-start gap-1">
              <span className="font-bold inline-block align-top text-green-800 text-lg">
                {price({ price: item.price, sale_price: item.sale_price })}
              </span>
              <span className="inline-block align-top text-sm">
                <span className="font-medium">{item.price}</span>
                <span className="font-light">원</span>
              </span>
              <span className="text-xs font-medium line-block items-center uppercase text-gray-800">
                ({item.sale_price})
              </span>
            </div>
            <p className="text-sm font-normal text-gray-800 break-all line-clamp-2">
              {item.contents}
            </p>
            <div className="mt-auto line-clamp-1 flex overflow-hidden whitespace-normal break-all text-xxs text-gray-700">
              {datetime.add(9, 'hour').format('YYYY.MM.DD')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SearchItem.Loader = function () {
  return (
    <div className="w-full h-auto p-4 rounded-2xl border-[none] shadow-lg clear-both">
      <div className="flex">
        <div className="flex w-full">
          <div className="relative flex-shrink-0 overflow-hidden w-[120px]">
            <Skeleton className="w-[120px] h-[174px] bg-slate-200" />
          </div>
          <div className="ml-4 flex flex-col grow w-full">
            <Skeleton className="w-[60%] h-7 bg-slate-200 mb-2 mt-1" />
            <Skeleton className="w-[70%] h-3 bg-slate-200 mb-2" />
            <Skeleton className="w-[80%] h-5 bg-slate-200 mb-2" />
            <Skeleton className="w-full h-16 bg-slate-200 my-1" />
            <Skeleton className="mt-auto w-14 h-3 bg-slate-200" />
          </div>
        </div>
      </div>
    </div>
  );
};
