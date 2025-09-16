import { useFormContext } from 'react-hook-form';

import { closeModal } from '@/entities/modal/store';
import {
  type AddMyBookHistoryType,
  useAddMyBookHistory,
} from '@/entities/my-book-history';
import { useAppDispatch } from '@/shared/redux/store';
import { Button } from '@/shared/ui/button';

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
  const dispatch = useAppDispatch();

  const myBookId = getValues('myBookId');
  const date = getValues('date');

  const { mutate } = useAddMyBookHistory({ myBookId });

  const onSubmit = (data: AddMyBookHistoryType) => {
    mutate(data, {
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
        <AddMyBookHistoryTimeCard date={date} />
        <AddMyBookHistoryPageCard />
        <AddMyBookHistoryMoodCard />
        <AddMyBookHistoryMemoCard />
      </div>
      <div className="mt-auto p-4">
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
