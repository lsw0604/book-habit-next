'use client';

import { useRef } from 'react';
import { v4 } from 'uuid';
import { useEventListener, useIntersectionObserver } from 'usehooks-ts';

import SearchItemContent from './search-item-content';
import ImageWrapper from '@/components/common/image-wrapper';

import { useAppDispatch } from '@/app/store';
import { modalActions } from '@/app/store/modal';
import { searchBookRegisterActions } from '@/app/store/searchBookRegister';

interface SearchItemProps {
  item: KakaoSearchResponseDocumentType;
  search: string;
}

const observerOptions = {
  root: null,
  rootMargin: '10px',
  threshold: 0.1,
};

export default function SearchItem({ item, search }: SearchItemProps) {
  const dispatch = useAppDispatch();
  const itemRef = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(itemRef, observerOptions);

  const isVisible = entry?.isIntersecting;
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

  return (
    <div
      ref={itemRef}
      key={isbn}
      className="w-full min-h-[350px] h-auto flex flex-col gap-4 p-4 rounded-2xl border-[none] shadow-lg"
    >
      {isVisible ? (
        <>
          <div className="flex justify-center">
            <ImageWrapper src={thumbnail} alt={v4()} width={120} height={174} />
          </div>
          <SearchItemContent content={rest} search={search} />
        </>
      ) : null}
    </div>
  );
}
