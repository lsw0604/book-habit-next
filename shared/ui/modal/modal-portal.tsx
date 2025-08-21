'use client';

import { AnimatePresence, motion } from 'framer-motion';
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

import { BACKDROP_VARIANT, MODAL_VARIANT } from './variants';

interface ModalPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalPortal({
  isOpen,
  onClose,
  children,
}: PropsWithChildren<ModalPortalProps>) {
  const [mounted, setMounted] = useState<boolean>(false);
  const ref = useRef<Element | null>(null);

  const onClick = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      onClose();
    },
    [onClose]
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
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

  if (ref.current && mounted) {
    return createPortal(
      <AnimatePresence mode="wait">
        {isOpen && (
          <div className="w-full h-full flex justify-center items-center fixed top-0 left-0 z-9998">
            <motion.div
              {...BACKDROP_VARIANT}
              className="absolute w-full h-full bg-black"
              role="button"
              aria-label="modal-bg"
              tabIndex={0}
              onClick={onClick}
              onKeyDown={onKeyDown}
            />
            <motion.div
              {...MODAL_VARIANT}
              className="absolute z-9999 w-full h-auto min-h-[10%] bottom-0 rounded-tl-lg rounded-tr-lg p-4 bg-white"
            >
              {children}
            </motion.div>
          </div>
        )}
      </AnimatePresence>,
      ref.current
    );
  }

  return null;
}
