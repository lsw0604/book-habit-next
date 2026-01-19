'use client';

import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { modalSelector } from '@/entities/modal';
import { useAppSelector } from '@/shared/redux';

import { ModalErrorFallback } from './modal-error-fallback';
import { ModalLoader } from './modal-loader';

// Dynamically import modal components
const PreviewBookModal = lazy(() =>
  import('@/features/preview-book/ui').then(module => ({
    default: module.PreviewBookModal,
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
      case 'PREVIEW_BOOK': {
        return <PreviewBookModal {...props} />;
      }
      case 'ADD_MY_BOOK_HISTORY': {
        return <AddMyBookHistoryModal {...props} />;
      }
      case 'ADD_MY_BOOK_REVIEW': {
        return <AddMyBookReviewModal {...props} />;
      }
      case 'EDIT_MY_BOOK_HISTORY': {
        return <EditMyBookHistoryModal {...props} />;
      }
      case 'VIEW_MY_BOOK_HISTORY': {
        return <ViewMyBookHistoryModal {...props} />;
      }
      case 'DELETE_MY_BOOK_HISTORY': {
        return <DeleteMyBookHistoryModal {...props} />;
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
