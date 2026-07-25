import { useFormContext } from 'react-hook-form';

import { useModal } from '@/entities/modal';
import { useAddMyBookHistory } from '../../hooks';
import { Button } from '@/shared/ui/button';

import type { AddMyBookHistoryType } from '../../schema';

import {
  AddMyBookHistoryMemoCard,
  AddMyBookHistoryMoodCard,
  AddMyBookHistoryPageCard,
  AddMyBookHistoryTimeCard,
} from './components';

export function AddMyBookHistoryForm() {
  const {
    formState: { isSubmitting },
    handleSubmit,
    getValues,
  } = useFormContext<AddMyBookHistoryType>();
  const { close } = useModal();

  const myBookId = getValues('myBookId');
  const date = getValues('date');

  const { mutate } = useAddMyBookHistory({ myBookId });

  const onSubmit = (data: AddMyBookHistoryType) => {
    mutate(data, {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col min-h-0"
    >
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none p-4 flex flex-col gap-y-4">
        <AddMyBookHistoryTimeCard date={date} />
        <AddMyBookHistoryPageCard />
        <AddMyBookHistoryMoodCard />
        <AddMyBookHistoryMemoCard />
      </div>
      <div className="p-4 border-t border-gray-100">
        <Button
          key="submit-btn"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? '등록 중...' : '등록하기'}
        </Button>
      </div>
    </form>
  );
}
