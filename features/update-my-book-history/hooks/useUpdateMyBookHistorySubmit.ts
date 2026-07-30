import { useFormContext } from "react-hook-form";

import {
  type UpdateMyBookHistoryProps,
  modalSelector,
  useModal,
} from "@/entities/modal";
import { useAppSelector } from "@/shared/redux";
import { extractDirtyValues } from "@/shared/utils";

import type {
  UpdateMyBookHistoryPayload,
  UpdateMyBookHistoryType,
} from '../schema';
import { useUpdateMyBookHistory } from './useUpdateMyBookHistory';

type UpdatableFields = keyof Pick<
  UpdateMyBookHistoryType,
  | 'startPage'
  | 'endPage'
  | 'startTime'
  | 'endTime'
  | 'readingMinutes'
  | 'readingMood'
  | 'memo'
>;

const ALLOWED_UPDATABLE_FIELDS: UpdatableFields[] = [
  'startPage',
  'endPage',
  'startTime',
  'endTime',
  'readingMinutes',
  'readingMood',
  'memo',
];

export function useUpdateMyBookHistorySubmit(myBookId: number) {
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, dirtyFields },
  } = useFormContext<UpdateMyBookHistoryType>();

  const { open, close } = useModal();
  const { props } = useAppSelector(modalSelector);

  // Redux Modal Props
  const modalProps = props as UpdateMyBookHistoryProps | undefined;
  const selectedHistory = modalProps?.selectedHistory;

  // 서버 Mutation 훅 연동
  const { mutateAsync, isPending } = useUpdateMyBookHistory(myBookId);

  // 이전 기록 보기 모달로 이동
  const handleClickGoBack = () => {
    if (selectedHistory) {
      open('VIEW_MY_BOOK_HISTORY', { selectedHistory });
    }
  };

  // 폼 제출 핸들러 (비동기 mutateAsync 사용으로 로딩 상태 동기화)
  const onSubmit = async (data: UpdateMyBookHistoryType) => {
    if (!isDirty) return;
    const changedFields = extractDirtyValues(
      data,
      dirtyFields,
      ALLOWED_UPDATABLE_FIELDS
    );
    const payload: UpdateMyBookHistoryPayload = {
      id: data.id,
      ...changedFields,
    };
    try {
      await mutateAsync(payload);
      /** TODO: 토스트 메시지 추가 */
      close();
    } catch (error) {
      /** TODO: 에러 처리 토스트 */
    }
  };

  const isLoading = isSubmitting || isPending;

  return {
    handleSubmit: handleSubmit(onSubmit),
    handleClickGoBack,
    isDirty,
    isLoading,
  };
}