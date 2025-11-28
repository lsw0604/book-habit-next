import type {
  Modal,
  ModalType,
  ModalProps,
  ModalPropsMap,
  AddMyBookHistoryProps,
  ViewMyBookHistoryProps,
  EditMyBookHistoryProps,
  DeleteMyBookHistoryProps,
  AddMyBookReviewProps,
  PreviewBookProps,
} from '../types';

export function isPreviewBookProps(
  props: ModalProps
): props is PreviewBookProps {
  return 'kakaoSearchBook' in props;
}

export function isAddMyBookHistoryProps(
  props: ModalProps
): props is AddMyBookHistoryProps {
  return 'selectedDate' in props;
}

export function isAddMyBookReviewProps(
  props: ModalProps
): props is AddMyBookReviewProps {
  return 'myBookId' in props;
}

export function isViewMyBookHistoryProps(
  props: ModalProps
): props is ViewMyBookHistoryProps {
  return 'selectedHistory' in props;
}

export function isEditMyBookHistoryProps(
  props: ModalProps
): props is EditMyBookHistoryProps {
  return 'selectedHistory' in props;
}

export function isDeleteMyBookHistoryProps(
  props: ModalProps
): props is DeleteMyBookHistoryProps {
  return 'selectedHistory' in props;
}

export function getTypedModalState<T extends ModalType>(
  modal: Modal,
  expectedType: T
): modal is Modal & {
  isOpen: true; // 모달이 열려있음을 타입 수준에서 명시
  type: T;
  // T를 이용해 ModalPropsMap에서 정확한 props 타입을 가져옵니다.
  props: ModalPropsMap[T];
} {
  // 런타임 검사는 동일하게 유지합니다.
  return (
    modal.isOpen && modal.type === expectedType && modal.props !== undefined
  );
}
