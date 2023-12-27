'use client';

import { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { v4 } from 'uuid';

import ImageWrapper from 'components/common/ImageWrapper';
import SearchItemBody from 'components/search/SearchItemBody';
import useObserverHook from '@/hooks/useObserverHook';
import { useAppDispatch } from '@/app/store';
import { modalActions } from '@/app/store/modal';
import { searchBookRegisterActions } from '@/app/store/searchBookRegister';

interface IProps {
  item: KakaoSearchResponseDocumentType;
  search: string;
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.mode.sub};
  border: none;
  width: 100%;
  min-height: 350px;
  height: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
`;

export default function SearchItem({ item, search }: IProps) {
  const dispatch = useAppDispatch();
  const itemRef = useRef<HTMLDivElement>(null);
  const { isbn, thumbnail, ...rest } = item;
  const ISBN = isbn.split(' ');
  const { isVisible } = useObserverHook(itemRef);

  const modalHandler = useCallback((type: ModalComponentType) => {
    dispatch(modalActions.setModalState({ type }));
  }, []);

  const setSearchBookRegister = useCallback(() => {
    dispatch(
      searchBookRegisterActions.setSearchBookRegister({
        ...item,
        isbn: ISBN[1],
      })
    );
  }, []);

  const openRegisterSearchBookModal = () => {
    modalHandler('registerSearchBook');
    setSearchBookRegister();
  };

  useEffect(() => {
    if (isVisible) {
      itemRef.current?.addEventListener('click', openRegisterSearchBookModal);
    }

    return () => {
      itemRef.current?.removeEventListener(
        'click',
        openRegisterSearchBookModal
      );
    };
  }, [isVisible]);

  return (
    <Container key={isbn} ref={itemRef}>
      {isVisible ? (
        <>
          <Header>
            <ImageWrapper src={thumbnail} alt={v4()} width={120} height={174} />
          </Header>
          <SearchItemBody content={rest} search={search} />
        </>
      ) : null}
    </Container>
  );
}
