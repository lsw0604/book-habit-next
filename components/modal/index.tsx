'use client';

import { RootState, useAppSelector } from '@/app/store';
import { ReactNode, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Transition } from '@headlessui/react';
import { motion } from 'framer-motion';

import modal from '@/app/store/modal';
import ModalHeader from './modal-header';
import { LogoMain } from '@/style/icon';
import { BookIcon } from 'lucide-react';
import RegisterSearchBookModal from './register-search-book-modal';

// const modalComponent: {
//   [key: ModalComponentType]: ReactNode;
// } = {
//   // isLogin: <LoginMessage />,
//   // registerSearchBook: <SearchBookRegister />,
//   // modifyComment: <CommentModifyModal />,
//   // registerComment: <CommentRegisterModal />,
//   // deleteComment: <CommentDeleteModal />,
//   // registerHistory: <HistoryRegisterModal />,
//   // deleteHistory: <HistoryDeleteModal />,
//   // deleteReply: <ReplyDeleteModal />,
//   // deleteMyBook: <MyBookDeleteModal />,
//   // modifyProfile: <ProfileModifyModal />,
// };

// const onChangeModalComponent = (ctx?: ModalComponentType) => {
//   if (ctx === undefined || !modal)

// }

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
      <Suspense>
        <RegisterSearchBookModal />
      </Suspense>
    </motion.div>
  );
}
