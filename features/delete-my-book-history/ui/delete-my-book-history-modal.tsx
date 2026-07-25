import { AlertTriangle } from 'lucide-react';

import { type DeleteMyBookHistoryProps, useModal } from '@/entities/modal';
import { Button } from '@/shared/ui/button';

import { useDeleteMyBookHistory } from '../hooks';

export function DeleteMyBookHistoryModal({
  selectedHistory,
}: DeleteMyBookHistoryProps) {
  const { open, close } = useModal();
  const { id } = selectedHistory;

  const { mutate } = useDeleteMyBookHistory(selectedHistory.myBookId);

  const handleClickGoBack = () => {
    open('VIEW_MY_BOOK_HISTORY', { selectedHistory });
  };

  const handleClickDelete = () => {
    mutate(
      id,
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
    <div className="flex flex-col p-4 py-4 gap-6">
      <div className="flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4 text-gray-800">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          독서 기록을 삭제하시겠어요?
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          삭제된 독서 기록은 복구할 수 없습니다.
          <br />
          정말로 삭제하시겠어요?
        </p>
      </div>
      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          key="delete-btn"
          variant="default"
          onClick={handleClickDelete}
          className="flex-1"
        >
          삭제하기
        </Button>
        <Button
          type="button"
          key="view-modal-btn"
          variant="outline"
          onClick={handleClickGoBack}
          className="flex-1"
        >
          뒤로가기
        </Button>
      </div>
    </div>
  );
}

