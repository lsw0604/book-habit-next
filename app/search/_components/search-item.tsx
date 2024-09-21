import dayjs from 'dayjs';
import ImageWrapper from '@/components/common/image-wrapper';
import { Skeleton } from '@/components/ui/skeleton';
import { formattedIsbn, formattedAuthor, formattedPrice } from '@/utils/book';
import { useAppDispatch } from '@/store';
import { setModal } from '@/store/features/modal/modal-slice';
import { setBookState } from '@/store/features/book/book-slice';

interface SearchItemProps {
  item: KakaoDocument;
}

export default function SearchItem({ item }: SearchItemProps) {
  const datetime = dayjs(item.datetime);
  const dispatch = useAppDispatch();

  const onClick = () => {
    dispatch(setModal({ isOpen: true }));
    dispatch(setBookState({ ...item, isbn: item.isbn.split(' ') }));
  };

  return (
    <div
      className="w-full h-auto p-4 rounded-2xl border-[none] shadow-lg clear-both"
      onClick={onClick}
    >
      <div className="flex">
        <div className="flex w-full">
          <div className="relative flex-shrink-0 overflow-hidden w-[120px]">
            <ImageWrapper
              src={item.thumbnail}
              alt={item.thumbnail}
              width={120}
              height={174}
              priority
            />
          </div>
          <div className="ml-4 flex flex-col grow">
            <span className="font-bold line-clamp-2 text-foreground text-base mt-1 hover:underline">
              {item.title}
            </span>
            <div className="line-clamp-1 flex overflow-hidden whitespace-normal break-all text-xxs text-gray-700">
              {formattedIsbn(item.isbn)}
            </div>
            <div className="line-clamp-2 flex overflow-hidden whitespace-normal break-all text-sm text-gray-800 my-1">
              {formattedAuthor(item.authors)} | {item.publisher}
            </div>
            <div className="flex flex-row flex-wrap place-items-center items-center justify-start gap-1">
              <span className="font-bold inline-block align-top text-green-800 text-lg">
                {formattedPrice({
                  price: item.price,
                  sale_price: item.sale_price,
                })}
              </span>
              <span className="inline-block align-top text-sm">
                <span className="font-medium">{item.price}</span>
                <span className="font-light">원</span>
              </span>
              {item.sale_price > 0 ?? (
                <span className="text-xs font-medium line-block items-center uppercase text-gray-800">
                  ({item.sale_price})
                </span>
              )}
            </div>
            <p className="text-sm font-normal text-gray-800 break-all line-clamp-2">
              {item.contents === ''
                ? '해당 책의 정보가 등록되지 않았습니다.'
                : item.contents}
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
