'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import {
  KeyboardEvent,
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { getModalTitle, modalSelector } from '@/entities/modal';
import { useAppSelector } from '@/shared/redux/store';

import { BACKDROP_VARIANT, MODAL_VARIANT } from './variants';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function ModalPortal({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<Props>) {
  const { type } = useAppSelector(modalSelector);
  const [mounted, setMounted] = useState<boolean>(false);
  const [shouldRender, setShouldRender] = useState<boolean>(false);
  const ref = useRef<Element | null>(null);

  const onClickHandle = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    },
    [onClose]
  );

  const keydownHandle = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    setMounted(true);
    const dom = document.getElementById('root-modal');
    if (dom) {
      ref.current = dom;
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    } else if (!isOpen && shouldRender) {
      const longestAnimationDuration = Math.max(
        MODAL_VARIANT.exit.transition.duration,
        BACKDROP_VARIANT.exit.transition.duration
      );
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, longestAnimationDuration * 1000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, shouldRender]);

  if (!ref.current || !mounted || !shouldRender) {
    return null;
  }

  return createPortal(
    <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 z-9998">
      <motion.div
        variants={BACKDROP_VARIANT}
        initial="initial"
        animate={isOpen ? 'animate' : 'exit'}
        className="absolute w-full h-full bg-black"
        role="button"
        aria-label="Close modal"
        tabIndex={0}
        onClick={onClickHandle}
        onKeyDown={keydownHandle}
      />
      <motion.div
        variants={MODAL_VARIANT}
        initial="initial"
        animate={isOpen ? 'animate' : 'exit'}
        className="absolute z-9999 w-full h-auto min-h-[10%] max-h-[80%] bottom-0 rounded-tl-lg rounded-tr-lg bg-white flex flex-col"
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            {getModalTitle(type)}
          </h2>
          <button
            type="button"
            key="close-btn"
            onClick={onClickHandle}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        {children}
      </motion.div>
    </div>,

    ref.current
  );
}
