'use client';

import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  modalSelector,
  getTypedModalState,
  isAddMyBookHistoryProps,
  isAddMyBookProps,
  isEditMyBookHistoryProps,
  isViewMyBookHistoryProps,
  isDeleteMyBookHistoryProps,
} from '@/entities/modal';
import { useAppSelector } from '@/shared/redux';

import { ModalErrorFallback } from './modal-error-fallback';
import { ModalLoader } from './modal-loader';

// Dynamically import modal components
const AddMyBookModal = lazy(() =>
  import('@/features/add-my-book/ui').then(module => ({
    default: module.AddMyBookModal,
  }))
);
const AddMyBookHistoryModal = lazy(() =>
  import('@/features/add-my-book-history').then(module => ({
    default: module.AddMyBookHistoryModal,
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
// const ViewMyBookHistoryModal = lazy(() => import('@/features/'));

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
      case 'ADD_MY_BOOK': {
        if (
          getTypedModalState({ isOpen, type, props }, 'ADD_MY_BOOK') &&
          isAddMyBookProps(props)
        ) {
          return <AddMyBookModal {...props} />;
        }
        throw new Error(
          `ADD_MY_BOOK modal: Invalid props type. Expected AddMyBookProps but received: ${JSON.stringify(props)}`
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
    // <ErrorBoundary FallbackComponent={ModalErrorFallback}>
    <Suspense fallback={<ModalLoader />}>{renderModal()}</Suspense>
    // </ErrorBoundary>
  );
}
