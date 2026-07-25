import { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  type UpdateMyBookHistoryProps,
  modalSelector,
  useModal,
} from '@/entities/modal';
import { useAppSelector } from '@/shared/redux';
import { Button } from '@/shared/ui/button';
import { extractDirtyValues } from '@/shared/utils';

import {
  UpdateMyBookHistoryMemoCard,
  UpdateMyBookHistoryMoodCard,
  UpdateMyBookHistoryPageCard,
  UpdateMyBookHistoryTimeCard,
} from './components';


import type {
  UpdateMyBookHistoryType,
  UpdateMyBookHistoryPayload
} from '../../schema';
import {
  useUpdateMyBookHistory,
} from '../../hooks';

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

interface EditMyBookHistoryFormProps {
  myBookId: number;
}

export function UpdateMyBookHistoryForm({
  myBookId,
}: EditMyBookHistoryFormProps) {
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, dirtyFields },
  } = useFormContext<UpdateMyBookHistoryType>();
  const { open, close } = useModal();
  const { props } = useAppSelector(modalSelector);
  const { selectedHistory } = props as UpdateMyBookHistoryProps;

  const { mutate } = useUpdateMyBookHistory(myBookId);

  const handleClickGoBack = () =>
    open('VIEW_MY_BOOK_HISTORY', { selectedHistory });

  const onSubmit = useCallback(
    (data: UpdateMyBookHistoryType) => {
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
          close();
        },
        onError: () => {
          /**
           * TODO 토스트 추가하기
           */
        },
      });
    },
    [mutate, close, isDirty, dirtyFields]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col min-h-0"
    >
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none p-4 flex flex-col gap-y-4">
        <UpdateMyBookHistoryTimeCard />
        <UpdateMyBookHistoryPageCard />
        <UpdateMyBookHistoryMoodCard />
        <UpdateMyBookHistoryMemoCard />
      </div>
      <div className="p-4 border-t border-gray-100 flex flex-col gap-4">
        {!isDirty && (
          <p className="text-xs text-gray-400 text-center">
            수정된 내용이 없습니다. 하나 이상 변경해 주세요.
          </p>
        )}
        <div className='flex gap-4'>
          <Button
            key="submit-btn"
            type="submit"
            disabled={isSubmitting || !isDirty}
            isLoading={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? '수정 중...' : '수정하기'}
          </Button>
          <Button
            key="view-modal-btn"
            type="button"
            className="flex-1"
            variant="outline"
            onClick={handleClickGoBack}
          >
            뒤로가기
          </Button>
        </div>
      </div>
    </form>
  );
}
