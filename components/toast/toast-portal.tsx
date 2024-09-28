'use client';

import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import useToastHook from '@/hooks/toast/useToastHook';
import Toast from '@/components/toast';

export default function ToastPortal() {
  const ref = useRef<Element | null>(null);
  const { toasts } = useToastHook();
  const [isMount, setIsMount] = useState<boolean>(false);

  useEffect(() => {
    setIsMount(true);
    const dom = document.getElementById('root-toast');
    if (dom) {
      ref.current = dom;
    }
  }, []);

  if (ref.current && isMount && toasts.length > 0) {
    return createPortal(
      <ol role="presentation" className="w-full fixed z-9999 px-2">
        <AnimatePresence>
          {toasts.slice(0, 3).map((toast) => (
            <Toast key={toast.id} {...toast} />
          ))}
        </AnimatePresence>
      </ol>,
      ref.current
    );
  }

  return null;
}
