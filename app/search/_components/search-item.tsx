'use client';

import { useRef, useState } from 'react';
import { v4 } from 'uuid';
import {
  useEventListener,
  useIntersectionObserver,
  useUpdateEffect,
} from 'usehooks-ts';

import SearchItemContent from './search-item-content';
import { Skeleton } from '@/components/ui/skeleton';
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

  useUpdateEffect(() => {
    if (isVisible) {
      setIsOpen(true);
    }
  }, [isVisible]);

  return (
    <div
      ref={itemRef}
      key={isbn}
      className="w-full min-h-[350px] h-auto flex flex-col gap-4 p-4 rounded-2xl border-[none] shadow-lg"
    >
      {isOpen ? (
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

SearchItem.Loader = function () {
  return (
    <div className="w-full min-h-[350px] h-auto flex flex-col gap-4 p-4 rounded-2xl border-[none] shadow-lg">
      <div className="flex justify-center items-center">
        <Skeleton className="w-[120px] h-[174px] bg-slate-200" />
      </div>
      <div className="w-full h-full">
        <Skeleton className="w-full h-[20px] bg-slate-200 mb-2" />
        <Skeleton className="w-[300px] h-[20px] bg-slate-200 mb-2" />
        <Skeleton className="w-[250px] h-[20px] bg-slate-200 mb-2" />
        <Skeleton className="w-[200px] h-[20px] bg-slate-200 mb-2" />
        <Skeleton className="w-[200px] h-[20px] bg-slate-200 mb-2" />
      </div>
    </div>
  );
};
