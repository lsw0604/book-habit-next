import { useFormContext } from 'react-hook-form';

import { closeModal } from '@/entities/modal';
import {
  EditMyBookHistoryType,
  UpdateMyBookHistoryPayload,
  useUpdateMyBookHistory,
} from '@/entities/my-book-history';
import { useAppDispatch } from '@/shared/redux/store';
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

  const { mutate } = useUpdateMyBookHistory();

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
      <div className="mt-auto p-4">
        <Button
          key="submit-btn"
          type="submit"
          disabled={isSubmitting || !isDirty}
          isLoading={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? '수정 중...' : '수정하기'}
        </Button>
      </div>
    </form>
  );
}
