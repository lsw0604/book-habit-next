'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

import ModalManager from '@/widgets/modal/ui/modal-manager';
import { useAppDispatch, useAppSelector } from '@/shared/redux/store';
import { modalSelector, setModalState } from '@/entities/modal/model/store';
import { MODAL_VARIANT } from './constant';

export default function ModalPortal() {
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
          {...MODAL_VARIANT}
          className="absolute z-9999 w-full h-auto min-h-[10%] bottom-0 rounded-tl-lg rounded-tr-lg p-4 bg-slate-100"
        >
          <ModalManager />
        </motion.div>
      </div>,
      ref.current
    );
  }

  return null;
}
