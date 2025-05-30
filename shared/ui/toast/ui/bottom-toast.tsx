'use client';

import { motion } from 'framer-motion';
import { useToastHook } from '../lib/hook/useToastHook';
import { Toast as ToastType } from '../model/types';
import { ShoppingCart } from 'lucide-react';

export default function BottomToast({
  id,
  message,
  status,
  position = 'BOTTOM',
}: ToastType) {
  const { removeToast } = useToastHook();

  const handleClose = () => {
    removeToast({ id });
  };

  return (
    <motion.div
      className="bg-gray-800 w-full text-white rounded-lg shadow-lg p-3 animate-slide-up"
      animate
      variants={{
        initial: {
          opacity: 0,
          y: 20,
        },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.3,
            ease: 'easeOut',
          },
        },
        exit: {
          opacity: 0,
          y: -20,
          transition: {
            duration: 0.2,
            ease: 'easeIn',
          },
        },
      }}
      layout
      role="alert"
    >
      <div className="flex items-center">
        <ShoppingCart className="w-5 h-5 text-green-400 mr-2 flex-shrink-0" />
        <p className="flex-1 text-sm">상품이 장바구니에 추가되었습니다</p>
        <button className="ml-2 px-3 py-1 bg-green-600 text-white text-xs rounded-md hover:bg-green-700">
          보기
        </button>
      </div>
    </motion.div>
  );
}
