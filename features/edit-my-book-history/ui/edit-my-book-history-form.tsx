import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  type EditMyBookHistoryProps,
  closeModal,
  modalSelector,
  openViewMyBookHistoryModal,
} from '@/entities/modal';
import {
  type EditMyBookHistoryType,
  type UpdateMyBookHistoryPayload,
  useUpdateMyBookHistory,
} from '@/entities/my-book-history';
import { useAppDispatch, useAppSelector } from '@/shared/redux';
import { Button } from '@/shared/ui/button';
import { extractDirtyValues } from '@/shared/utils';

import {
  EditMyBookHistoryMemoCard,
  EditMyBookHistoryMoodCard,
  EditMyBookHistoryPageCard,
  EditMyBookHistoryTimeCard,
} from './components';

type UpdatableFields = keyof Pick<
  EditMyBookHistoryType,
  | 'startPage'
  | 'endPage'
  | 'startTime'
  | 'endTime'
  | 'readingMinutes'
  | 'readingMood'
  | 'memo'
>;

interface EditMyBookHistoryFormProps {
  myBookId: number;
}

export function EditMyBookHistoryForm({
  myBookId,
}: EditMyBookHistoryFormProps) {
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, dirtyFields },
  } = useFormContext<EditMyBookHistoryType>();
  const dispatch = useAppDispatch();
  const { props } = useAppSelector(modalSelector);
  const { selectedHistory } = props as EditMyBookHistoryProps;

  const { mutate } = useUpdateMyBookHistory({ myBookId });

  const handleClickGoBack = () =>
    dispatch(
      openViewMyBookHistoryModal({
        selectedHistory,
      })
    );

  const onSubmit = useCallback(
    (data: EditMyBookHistoryType) => {
      if (!isDirty) return null;

      const allowedFields: UpdatableFields[] = [
        'startPage',
        'endPage',
        'startTime',
        'endTime',
        'readingMinutes',
        'readingMood',
        'memo',
      ];

      const changedFields = extractDirtyValues(
        data,
        dirtyFields,
        allowedFields
      );

      const payload: UpdateMyBookHistoryPayload = {
        id: data.id,
        ...changedFields,
      };

      mutate(payload, {
        onSuccess: () => {
          /**
           * TODO 토스트 추가하기
           */
          dispatch(closeModal());
        },
        onError: () => {
          /**
           * TODO 토스트 추가하기
           */
        },
      });
    },
    [mutate, dispatch, isDirty, dirtyFields]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col flex-grow h-full"
    >
      <div className="flex-grow space-y-4 overflow-y-auto scrollbar-none gap-4 p-4">
        <EditMyBookHistoryTimeCard />
        <EditMyBookHistoryPageCard />
        <EditMyBookHistoryMoodCard />
        <EditMyBookHistoryMemoCard />
      </div>
      <div className="mt-auto p-4 flex gap-4">
        <Button
          key="view-modal-btn"
          type="button"
          className="flex-1"
          variant="outline"
          onClick={handleClickGoBack}
        >
          뒤로가기
        </Button>
        <Button
          key="submit-btn"
          type="submit"
          disabled={isSubmitting || !isDirty}
          isLoading={isSubmitting}
          className="flex-1"
        >
          {isSubmitting ? '수정 중...' : '수정하기'}
        </Button>
      </div>
    </form>
  );
}
