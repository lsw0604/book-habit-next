import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

import { formattedAuthor, formattedPrice } from '../../utils/formatter';
import { BookSearchItemProps } from '../../ui/types';
import BookSearchItemLoader from '../../ui/item/loader';
import { formatISBNToArray } from '../../utils/helper';

import { setModalState } from '@/entities/modal/model';
import { setBookState } from '@/entities/book/model';

import { observerOption } from '@/shared/hooks/infinite-scroll/util';
import { useAppDispatch } from '@/shared/redux/store';
import ImageWrapper from '@/shared/common/image-wrapper';

export default function BookSearchItem({ item }: BookSearchItemProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { ref, isIntersecting } = useIntersectionObserver(
    observerOption({ threshold: 0.3 })
  );
  const dispatch = useAppDispatch();

  const datetime = dayjs(item.datetime);

  const modalHandler = useCallback(() => {
    dispatch(setModalState({ isOpen: true, type: 'REGISTER_MY_BOOK' }));
    dispatch(setBookState({ ...formatISBNToArray(item) }));
  }, [item]);

  useEffect(() => {
    if (isIntersecting) {
      setIsVisible(true);
    }
  }, [isIntersecting]);

  if (!isVisible) return <BookSearchItemLoader ref={ref} />;

  return (
    <li
      ref={ref}
      className="w-full h-auto p-4 rounded-2xl border-[none] shadow-lg clear-both"
      onClick={modalHandler}
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
              {item.isbn}
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
              {item.sale_price > 0 ? (
                <span className="text-xs font-medium line-block items-center uppercase text-gray-800">
                  ({item.sale_price})
                </span>
              ) : null}
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
    </li>
  );
}
