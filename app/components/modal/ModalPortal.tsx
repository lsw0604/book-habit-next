'use client';

import styled from 'styled-components';
import { ReactNode, useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

import { modalActions } from 'store/modal';
import { RootState, useAppDispatch, useAppSelector } from 'store';

interface IProps {
  children: ReactNode;
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9998;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

export default function ModalPortal({ children }: IProps) {
  const dispatch = useAppDispatch();

  const [mounted, setMounted] = useState<boolean>(false);
  const ref = useRef<Element | null>();

  const { isOpen } = useAppSelector((state: RootState) => state.modal);
  const modalClose = () => dispatch(modalActions.setModalClose());

  useEffect(() => {
    setMounted(true);
    const dom = document.getElementById('root-modal');
    if (dom) {
      ref.current = dom;
    }
  }, []);

  const onModalClose = () => modalClose();

  if (ref.current && mounted && isOpen) {
    return createPortal(
      <Container role="presentation">
        <Background onClick={onModalClose} />
        {children}
      </Container>,
      ref.current
    );
  }
  return null;
}
