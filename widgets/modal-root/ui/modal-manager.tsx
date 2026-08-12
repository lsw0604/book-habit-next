'use client';

import { Suspense, lazy } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { modalSelector } from '@/entities/modal';
import { useAppSelector } from '@/shared/redux';

import { ModalErrorFallback } from './modal-error-fallback';
import { ModalLoader } from './modal-loader';

// Dynamically import modal components
const ViewSearchedBookModal = lazy(() =>
  import('@/features/view-searched-book').then(module => ({
    default: module.ViewSearchedBookModal,
  }))
);
const ViewMyBookHistoryModal = lazy(() =>
  import('@/features/view-my-book-history').then(module => ({
    default: module.ViewMyBookHistoryModal,
  }))
);
const ViewMyBookReviewModal = lazy(() =>
  import('@/features/view-my-book-review').then(module => ({
    default: module.ViewMyBookReviewModal,
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
const AddMyBookWithReviewModal = lazy(() =>
  import('@/features/add-my-book-with-review').then(module => ({
    default: module.AddMyBookWithReviewModal
  }))
)
const UpdateMyBookHistoryModal = lazy(() =>
  import('@/features/update-my-book-history').then(module => ({
    default: module.UpdateMyBookHistoryModal,
  }))
);
const UpdateMyBookReviewModal = lazy(() => 
  import('@/features/update-my-book-review').then(module => ({
    default: module.UpdateMyBookReviewModal,
  }))
)
const DeleteMyBookModal = lazy(() => 
  import('@/features/delete-my-book').then(module => ({
    default: module.DeleteMyBookModal,
  }))
)
const DeleteMyBookHistoryModal = lazy(() =>
  import('@/features/delete-my-book-history').then(module => ({
    default: module.DeleteMyBookHistoryModal,
  }))
);
const DeleteMyBookReviewModal = lazy(() =>
  import('@/features/delete-my-book-review').then(module => ({
    default: module.DeleteMyBookReviewModal,
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
      case 'VIEW_SEARCHED_BOOK': {
        return <ViewSearchedBookModal {...props} />;
      }
      case 'VIEW_MY_BOOK_HISTORY': {
        return <ViewMyBookHistoryModal {...props} />;
      }
      case 'VIEW_MY_BOOK_REVIEW': {
        return <ViewMyBookReviewModal {...props} />;
      }
      case 'ADD_MY_BOOK_HISTORY': {
        return <AddMyBookHistoryModal {...props} />;
      }
      case 'ADD_MY_BOOK_REVIEW': {
        return <AddMyBookReviewModal {...props} />;
      }
      case 'ADD_MY_BOOK_WITH_REVIEW': {
        return <AddMyBookWithReviewModal {...props} />;
      }
      case 'UPDATE_MY_BOOK_HISTORY': {
        return <UpdateMyBookHistoryModal {...props} />;
      }
      case 'UPDATE_MY_BOOK_REVIEW': {
        return <UpdateMyBookReviewModal {...props} />
      }
      case 'DELETE_MY_BOOK': {
        return <DeleteMyBookModal {...props} />
      }
      case 'DELETE_MY_BOOK_HISTORY': {
        return <DeleteMyBookHistoryModal {...props} />;
      }
      case 'DELETE_MY_BOOK_REVIEW': {
        return <DeleteMyBookReviewModal {...props} />;
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
