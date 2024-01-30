'use client';

import { RootState, useAppDispatch, useAppSelector } from '@/app/store';
import { modalActions } from '@/app/store/modal';
import { ReactNode, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useEffectOnce } from 'usehooks-ts';

export default function ModalPortal({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  const [mounted, setMounted] = useState<boolean>(false);
  const ref = useRef<Element | null>(null);

  const { isOpen } = useAppSelector((state: RootState) => state.modal);

  const modalClose = () => dispatch(modalActions.setModalClose());

  useEffectOnce(() => {
    setMounted(true);
    const dom = document.getElementById('root-modal');
    if (dom) {
      ref.current = dom;
    }
  });

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
