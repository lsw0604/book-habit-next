'use client';

import { ReactNode, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

import { RootState, useAppSelector } from '@/app/store';
import ModalLoader from './modal-loader';

const RegisterSearchBook = dynamic(
  () => import('../modal/register-search-book-modal'),
  {
    ssr: false,
  }
);

const modalComponent: {
  [key: string]: ReactNode;
} = {
  isLogin: <div />,
  registerSearchBook: <RegisterSearchBook />,
  modifyComment: <div />,
  registerComment: <div />,
  deleteComment: <div />,
  registerHistory: <div />,
  deleteHistory: <div />,
  deleteReply: <div />,
  deleteMyBook: <div />,
  modifyProfile: <div />,
};

const onChangeModalComponent = (ctx?: ModalComponentType) => {
  if (ctx === undefined || !modalComponent[ctx]) return null;
  return modalComponent[ctx];
};

export default function Modal() {
  const { type } = useAppSelector((state: RootState) => state.modal);

  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{
        type: 'spring',
        damping: 20,
        stiffness: 100,
        duration: 0.3,
      }}
      className="absolute z-9999 w-full h-auto min-h-[30%] bottom-0 rounded-tl-lg rounded-tr-lg p-4 grid bg-slate-100"
    >
      <Suspense fallback={<ModalLoader />}>
        {onChangeModalComponent(type)}
      </Suspense>
    </motion.div>
  );
}
