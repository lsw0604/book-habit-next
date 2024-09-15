'use client';

import { useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import { useEventListener, useIntersectionObserver } from 'usehooks-ts';

import SearchItemContent from './search-item-content';
import ImageWrapper from '@/components/common/image-wrapper';

import { useAppDispatch } from '@/app/store';
import { modalActions } from '@/app/store/modal';
import { searchBookRegisterActions } from '@/app/store/searchBookRegister';
import { OBSERVER_OPTION } from '@/constant/observer-option';

interface SearchItemProps {
  item: KakaoSearchResponseDocumentType;
  search: string;
}

export default function SearchItem({ item, search }: SearchItemProps) {
  const dispatch = useAppDispatch();
  const itemRef = useRef<HTMLDivElement | null>(null);
  const { isIntersecting, ref } = useIntersectionObserver(OBSERVER_OPTION);

  const [isOpen, setIsOpen] = useState(false);
  const { isbn, thumbnail, ...rest } = item;
  const ISBN = isbn.split(' ');

  const openRegisterSearchBookModal = () => {
    dispatch(modalActions.setModalState({ type: 'registerSearchBook' }));
    dispatch(
      searchBookRegisterActions.setSearchBookRegister({
        ...item,
        isbn: ISBN[1],
      })
    );
  };

  useEventListener('click', openRegisterSearchBookModal, itemRef);
  useEffect(() => {
    if (isIntersecting) {
      setIsOpen(true);
    }
    console.log(isIntersecting);
  }, [isIntersecting]);

  return (
    <div
      ref={ref}
      key={isbn}
      className="w-full min-h-[350px] h-auto flex flex-col gap-4 p-4 rounded-2xl border-[none] shadow-lg"
    >
      {isOpen ? (
        <>
          <h3 className="mt-4">{search}</h3>
          <div className="flex justify-center">
            <ImageWrapper src={thumbnail} alt={v4()} width={120} height={174} />
          </div>
          <SearchItemContent content={rest} search={search} />
        </>
      ) : null}
    </div>
  );
}
