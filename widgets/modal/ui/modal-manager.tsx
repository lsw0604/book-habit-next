'use client';

import { Suspense, lazy } from 'react';

import { modalSelector } from '@/entities/modal/store';
import type {
  RegisterMyBookProps,
  RegisterMyBookHistoryProps,
  SelectedMyBookHistoryProps,
} from '@/entities/modal/store/types';
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
// 원본 코드
// const RegisterMyBookHistoryModal = lazy(() =>
//   import('@/features/add-my-book-history').then(module => ({
//     default: module.RegisterMyBookHistoryModal,
//   }))
// );
// const SelectedMyBookHistoryModal = lazy(() =>
//   import('@/features/').then(module => ({
//     default: module.ModifyMyBookHistoryModal,
//   }))
// );

export default function ModalManager() {
  const { isOpen, type, props } = useAppSelector(modalSelector);

  console.log('Modal state:', { isOpen, type, props });

  if (!isOpen || !type) {
    return null;
  }

  const renderModal = () => {
    switch (type) {
      case 'REGISTER_MY_BOOK':
        return <AddMyBookModal {...(props as RegisterMyBookProps)} />;
      case 'REGISTER_MY_BOOK_HISTORY':
        return (
          <RegisterMyBookHistoryModal
            {...(props as RegisterMyBookHistoryProps)}
          />
        );

      // case 'SELECTED_MY_BOOK_HISTORY':
      //   return <S {...(props as SelectedMyBookHistoryProps)} />;

      default:
        return null;
    }
  };

  return <Suspense fallback={<ModalLoader />}>{renderModal()}</Suspense>;
}
