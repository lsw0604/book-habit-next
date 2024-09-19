'use client';

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { useAppDispatch, useAppSelector } from '@/store';
import { modalSelector } from '@/store/features/modal/modal-selector';
import { setModal } from '@/store/features/modal/modal-slice';

export default function ModalPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState<boolean>(false);
  const ref = useRef<Element | null>(null);

  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(modalSelector);

  const modalClose = useCallback(() => {
    dispatch(setModal({ isOpen: false }));
  }, [dispatch]);

  useEffect(() => {
    setMounted(true);
    const dom = document.getElementById('root-modal');
    if (dom) {
      ref.current = dom;
    }
  }, []);

  if (ref.current && mounted && isOpen) {
    return createPortal(
      <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 z-9998">
        <div
          className="absolute w-full h-full bg-[rgba(0,0,0,0.7)]"
          onClick={modalClose}
        />
        {children}
      </div>,
      ref.current
    );
  }

  return null;
}
