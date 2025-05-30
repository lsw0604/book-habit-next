'use client';

import { createPortal } from 'react-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { useToastHook } from './lib/hook/useToastHook';
import Toast from './ui/toast';
import BottomToast from './ui/bottom-toast';

export default function ToastPortal() {
  const ref = useRef<Element | null>(null);
  const { toasts } = useToastHook();
  const [isMount, setIsMount] = useState<boolean>(false);

  useEffect(() => {
    setIsMount(true);
    const dom = document.getElementById('root-toast');
    if (dom) {
      ref.current = dom;
    } else {
      const element = document.createElement('div');
      element.id = 'root-toast';

      document.body.appendChild(element);
      ref.current = element;
    }
  }, []);

  if (!isMount || !ref.current) return null;

  return createPortal(
    <div className="absolute inset-0 flex flex-col pointer-events-none">
      {/* 상단 토스트 - 흰색 배경 스타일 */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-2 w-full max-w-md px-4">
        <AnimatePresence>
          {toasts.top.map(toast => (
            <Toast key={toast.id} {...toast} />
          ))}
        </AnimatePresence>
      </div>

      {/* 하단 토스트 - 다크 스타일 */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex flex-col-reverse items-center gap-2 w-full max-w-md px-4">
        <AnimatePresence>
          {toasts.bottom.map(toast => (
            <BottomToast key={toast.id} {...toast} />
          ))}
        </AnimatePresence>
      </div>
    </div>,
    ref.current
  );
}
