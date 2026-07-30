import { Button } from '@/shared/ui/button';

import {
  UpdateMyBookHistoryMemoCard,
  UpdateMyBookHistoryMoodCard,
  UpdateMyBookHistoryPageCard,
  UpdateMyBookHistoryTimeCard,
} from './components';

import {
  useUpdateMyBookHistorySubmit,
} from '../../hooks';

interface EditMyBookHistoryFormProps {
  myBookId: number;
}

export function UpdateMyBookHistoryForm({
  myBookId,
}: EditMyBookHistoryFormProps) {
  const { handleSubmit, handleClickGoBack, isDirty, isLoading } =
    useUpdateMyBookHistorySubmit(myBookId);

  return (
    <form
      onSubmit={handleSubmit}
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
            disabled={isLoading || !isDirty}
            isLoading={isLoading}
            className="flex-1"
          >
            {isLoading ? '수정 중...' : '수정하기'}
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
