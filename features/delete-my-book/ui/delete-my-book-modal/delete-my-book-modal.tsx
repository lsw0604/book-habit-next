import { AlertTriangle } from 'lucide-react';

import { type DeleteMyBookProps, useModal } from '@/entities/modal';
import { Button } from '@/shared/ui/button';

import { useDeleteMyBook } from '../../hooks';

export function DeleteMyBookModal({
  myBookId,
  _count
}: DeleteMyBookProps) {
  const { close } = useModal();

  const { mutate } = useDeleteMyBook();

  const hasCount = _count && (_count.history > 0 || _count.review > 0);

  const handleClickGoBack = () => close();
  const handleClickDelete = () => {
    mutate(
      myBookId,
      {
        onSuccess: () => {
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
          서재에서 책을 삭제하시겠어요?
        </h3>
        {hasCount && (
          <div className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 my-2 text-xs text-gray-600 flex items-center justify-center gap-4">
            {_count.history > 0 && (
              <span>
                독서 기록 <strong className="text-gray-900 font-bold">{_count.history}개</strong>
              </span>
            )}
            {_count.history > 0 && _count.review > 0 && (
              <span className="text-gray-300">|</span>
            )}
            {_count.review > 0 && (
              <span>
                한줄평 <strong className="text-gray-900 font-bold">{_count.review}개</strong>
              </span>
            )}
          </div>
        )}
        <p className="text-sm text-gray-500 leading-relaxed mt-1">
          {hasCount ? (
            <>
              작성하신 <span className="font-semibold text-gray-700">독서 기록 및 한줄평도 함께 삭제</span>되며
              <br />
              복구할 수 없습니다. 정말로 삭제하시겠어요?
            </>
          ) : (
            <>
              삭제된 책은 서재에서 삭제되며 복구할 수 없습니다.
              <br />
              정말로 삭제하시겠어요?
            </>
          )}
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


