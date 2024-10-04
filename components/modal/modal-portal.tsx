'use client';

import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

import { useAppDispatch, useAppSelector } from '@/store';
import { modalSelector } from '@/store/features/modal/modal-selector';
import { setModalState } from '@/store/features/modal/modal-slice';
import { MODAL_VARIANT } from '@/constant/modal-variant';

export default function ModalPortal({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState<boolean>(false);
  const ref = useRef<Element | null>(null);

  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(modalSelector);

  const modalClose = useCallback(() => {
    dispatch(setModalState({ isOpen: false, type: undefined }));
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
          className="absolute w-full h-full bg-black opacity-60"
          onClick={modalClose}
        />
        <motion.div
          initial={MODAL_VARIANT.initial}
          animate={MODAL_VARIANT.animate}
          exit={MODAL_VARIANT.exit}
          transition={MODAL_VARIANT.transition}
          className="absolute z-9999 w-full h-auto min-h-[10%] bottom-0 rounded-tl-lg rounded-tr-lg p-4 bg-slate-100"
        >
          {children}
        </motion.div>
      </div>,
      ref.current
    );
  }

  return null;
}
