'use client';

import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  modalSelector,
  getTypedModalState,
  isAddMyBookHistoryProps,
  isEditMyBookHistoryProps,
  isViewMyBookHistoryProps,
  isDeleteMyBookHistoryProps,
  isAddMyBookReviewProps,
  isAddBookProps,
} from '@/entities/modal';
import { useAppSelector } from '@/shared/redux';

import { ModalErrorFallback } from './modal-error-fallback';
import { ModalLoader } from './modal-loader';

// Dynamically import modal components
const AddBookModal = lazy(() =>
  import('@/features/add-book/ui').then(module => ({
    default: module.AddBookModal,
  }))
);
const AddMyBookHistoryModal = lazy(() =>
  import('@/features/add-my-book-history').then(module => ({
    default: module.AddMyBookHistoryModal,
  }))
);
const AddMyBookReviewModal = lazy(() =>
  import('@/features/add-my-book-review').then(module => ({
    default: module.AddMyBookReviewModal,
  }))
);
const EditMyBookHistoryModal = lazy(() =>
  import('@/features/edit-my-book-history').then(module => ({
    default: module.EditMyBookHistoryModal,
  }))
);
const DeleteMyBookHistoryModal = lazy(() =>
  import('@/features/delete-my-book-history').then(module => ({
    default: module.DeleteMyBookHistoryModal,
  }))
);
const ViewMyBookHistoryModal = lazy(() =>
  import('@/features/view-my-book-history').then(module => ({
    default: module.ViewMyBookHistoryModal,
  }))
);

const LazyRegisterMyBookHistoryModal = lazy(async () => {
  // 1. 시간 지연
  await new Promise(resolve => {
    setTimeout(resolve, 15 * 1000);
  });

  // 2. 모듈 import
  const customModule = await import('@/features/add-my-book-history').then(
    module => ({
      default: module.AddMyBookHistoryModal,
    })
  );

  // 3. 모듈 반환
  return customModule;
});

export function ModalManager() {
  const { isOpen, type, props } = useAppSelector(modalSelector);

  if (!isOpen || !type || !props) {
    return null;
  }

  const renderModal = () => {
    switch (type) {
      case 'ADD_BOOK': {
        if (
          getTypedModalState({ isOpen, type, props }, 'ADD_BOOK') &&
          isAddBookProps(props)
        ) {
          return <AddBookModal {...props} />;
        }
        throw new Error(
          `ADD_BOOK modal: Invalid props type. Expected AddBookProps but received: ${JSON.stringify(props)}`
        );
      }
      case 'ADD_MY_BOOK_HISTORY': {
        if (
          getTypedModalState({ isOpen, type, props }, 'ADD_MY_BOOK_HISTORY') &&
          isAddMyBookHistoryProps(props)
        ) {
          return <AddMyBookHistoryModal {...props} />;
        }
        throw new Error(
          `ADD_MY_BOOK_HISTORY modal: Invalid props type. Expected AddMyBookHistoryProps but received: ${JSON.stringify(props)}`
        );
      }
      case 'ADD_MY_BOOK_REVIEW': {
        if (
          getTypedModalState({ isOpen, type, props }, 'ADD_MY_BOOK_REVIEW') &&
          isAddMyBookReviewProps(props)
        ) {
          return <AddMyBookReviewModal {...props} />;
        }
        throw new Error(
          `ADD_MY_BOOK_Review modal: Invalid props type. Expected AddMyBookReviewProps but received: ${JSON.stringify(props)}`
        );
      }
      case 'EDIT_MY_BOOK_HISTORY': {
        if (
          getTypedModalState({ isOpen, type, props }, 'EDIT_MY_BOOK_HISTORY') &&
          isEditMyBookHistoryProps(props)
        ) {
          return <EditMyBookHistoryModal {...props} />;
        }
        throw new Error(
          `EDIT_MY_BOOK_HISTORY modal: Invalid props type. Expected EditMyBookHistoryProps but received: ${JSON.stringify(props)}`
        );
      }
      case 'VIEW_MY_BOOK_HISTORY': {
        if (
          getTypedModalState({ isOpen, type, props }, 'VIEW_MY_BOOK_HISTORY') &&
          isViewMyBookHistoryProps(props)
        ) {
          return <ViewMyBookHistoryModal {...props} />;
        }
        throw new Error(
          `VIEW_MY_BOOK_HISTORY modal: Invalid props type. Excepted ViewMyBookHistoryProps but received: ${JSON.stringify(props)}`
        );
      }
      case 'DELETE_MY_BOOK_HISTORY': {
        if (
          getTypedModalState(
            { isOpen, type, props },
            'DELETE_MY_BOOK_HISTORY'
          ) &&
          isDeleteMyBookHistoryProps(props)
        ) {
          return <DeleteMyBookHistoryModal {...props} />;
        }
        throw new Error(
          `VIEW_MY_BOOK_HISTORY modal: Invalid props type. Excepted ViewMyBookHistoryProps but received: ${JSON.stringify(props)}`
        );
      }
      default:
        return null;
    }
  };

  return (
    <ErrorBoundary FallbackComponent={ModalErrorFallback}>
      <Suspense fallback={<ModalLoader />}>{renderModal()}</Suspense>
    </ErrorBoundary>
  );
}
