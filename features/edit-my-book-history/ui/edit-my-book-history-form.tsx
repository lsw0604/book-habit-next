import { useFormContext } from 'react-hook-form';

import {
  closeModal,
  EditMyBookHistoryProps,
  modalSelector,
  openViewMyBookHistoryModal,
} from '@/entities/modal';
import {
  EditMyBookHistoryType,
  UpdateMyBookHistoryPayload,
  useUpdateMyBookHistory,
} from '@/entities/my-book-history';
import { useAppDispatch, useAppSelector } from '@/shared/redux/store';
import { Button } from '@/shared/ui/button';
import { extractDirtyValues } from '@/shared/utils';

import { UpdatableFields } from '../types';

import {
  EditMyBookHistoryMemoCard,
  EditMyBookHistoryMoodCard,
  EditMyBookHistoryPageCard,
  EditMyBookHistoryTimeCard,
} from './components';

export function EditMyBookHistoryForm() {
  const {
    handleSubmit,
    formState: { isSubmitting, isDirty, dirtyFields },
  } = useFormContext<EditMyBookHistoryType>();
  const dispatch = useAppDispatch();
  const { props } = useAppSelector(modalSelector);
  const { selectedHistory } = props as EditMyBookHistoryProps;

  const { mutate } = useUpdateMyBookHistory();

  const openViewModal = () =>
    dispatch(
      openViewMyBookHistoryModal({
        selectedHistory,
      })
    );

  const onSubmit = (data: EditMyBookHistoryType) => {
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

    const changedFields = extractDirtyValues(data, dirtyFields, allowedFields);

    const payload: UpdateMyBookHistoryPayload = {
      id: data.id,
      ...changedFields,
    };

    mutate(payload, {
      onSuccess: () => {
        dispatch(closeModal());
      },
    });
  };

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
          onClick={openViewModal}
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
