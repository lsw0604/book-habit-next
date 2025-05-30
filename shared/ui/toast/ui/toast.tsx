'use client';

import type { Toast as ToastType } from '../model/types';
import { motion } from 'framer-motion';
import { Bell, X } from 'lucide-react';
import { useToastHook } from '../lib/hook/useToastHook';

// 토스트 애니메이션 variants
const toastVariants = {
  initial: (position: string) => ({
    opacity: 0,
    y: position === 'TOP' ? -20 : 20,
  }),
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
  exit: (position: string) => ({
    opacity: 0,
    y: position === 'TOP' ? -20 : 20,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  }),
};

// 토스트 상태별 스타일
const statusStyles = {
  SUCCESS: 'bg-green-500 text-white',
  ERROR: 'bg-red-500 text-white',
  WARNING: 'bg-yellow-500 text-white',
  INFO: 'bg-blue-500 text-white',
};

export default function Toast({
  id,
  message,
  status,
  position = 'TOP',
}: ToastType) {
  const { removeToast } = useToastHook();

  const handleClose = () => {
    removeToast({ id });
  };

  return (
    <motion.div
      className="flex flex-col h-full w-full justify-between pointer-events-auto"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
          y: -20,
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
      layout // 다른 토스트가 사라질 때 부드럽게 재배치
      role="alert"
    >
      <div className="bg-white rounded-lg shadow-md p-3 animate-slide-down">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3 flex-shrink-0">
            <Bell className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">새 알림</p>
            <p className="text-xs text-gray-600">
              새로운 공지사항이 등록되었습니다
            </p>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" onClick={handleClose} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
