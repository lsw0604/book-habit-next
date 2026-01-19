import { AlertTriangle } from 'lucide-react';

import { type DeleteMyBookHistoryProps, useModal } from '@/entities/modal';
import { useDeleteMyBookHistory } from '@/entities/my-book-history';
import { Button } from '@/shared/ui/button';

export function DeleteMyBookHistoryModal({
  selectedHistory,
}: DeleteMyBookHistoryProps) {
  const { open, close } = useModal();
  const { id } = selectedHistory;

  const { mutate } = useDeleteMyBookHistory({
    myBookId: selectedHistory.myBookId,
  });

  const handleClickGoBack = () => {
    open('VIEW_MY_BOOK_HISTORY', { selectedHistory });
  };

  const handleClickDelete = () => {
    mutate(
      { id },
      {
        onSuccess: () => {
          /**
           * TODO 토스트 알람 추가하기
           */
          close();
        },
      }
    );
  };

  return (
    <div className="flex flex-col max-h-[75vh] p-4 gap-4">
      <div className="flex flex-col items-center">
        <div className="w-full p-4 flex items-center justify-center mb-4">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          독서 기록을 삭제하시겠어요?
        </h3>
        <p className="text-sm text-gray-500 text-center leading-relaxed">
          삭제된 독서 기록은 복구할 수 없습니다.
          <br />
          정말로 삭제하시겠어요?
        </p>
      </div>
      <div className="flex space-x-3 pt-2">
        <Button
          type="button"
          key="view-modal-btn"
          variant="outline"
          onClick={handleClickGoBack}
          className="flex-1"
        >
          뒤로가기
        </Button>
        <Button
          type="button"
          key="delete-btn"
          onClick={handleClickDelete}
          className="flex-1"
        >
          삭제하기
        </Button>
      </div>
    </div>
  );
}
