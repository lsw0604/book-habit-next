'use client';

import { Suspense, lazy } from 'react';

import { modalSelector } from '@/entities/modal/model/store';
import { useAppSelector } from '@/shared/redux/store';

import ModalLoader from './modal-loader';

// Dynamically import modal components
const AddMyBookModal = lazy(() =>
  import('@/features/add-my-book').then(module => ({
    default: module.AddMyBookModal,
  }))
);
const RegisterMyBookHistoryModal = lazy(() =>
  import('@/features/add-my-book-history').then(module => ({
    default: module.RegisterMyBookHistoryModal,
  }))
);

export default function ModalManager() {
  const { type } = useAppSelector(modalSelector);

  const renderModal = () => {
    switch (type) {
      case 'REGISTER_MY_BOOK':
        return <AddMyBookModal />;
      case 'REGISTER_MY_BOOK_HISTORY':
        return <RegisterMyBookHistoryModal />;
      default:
        return null;
    }
  };

  return <Suspense fallback={<ModalLoader />}>{renderModal()}</Suspense>;
}
