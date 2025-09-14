import {
  openDeleteMyBookHistory,
  openEditMyBookHistory,
} from '@/entities/modal';
import { ViewMyBookHistoryProps } from '@/entities/modal/types';
import {
  MyBookHistoryMemo,
  MyBookHistoryReadPage,
  MyBookHistoryReadTime,
  MyBookHistoryReadDate,
  MyBookHistoryCommentary,
  MyBookHistoryReadingMood,
  MyBookHistoryDateLabel,
} from '@/entities/my-book-history';
import { useAppDispatch } from '@/shared/redux/store';
import { Button } from '@/shared/ui/button';

export function ViewMyBookHistoryModal({
  selectedHistory,
}: ViewMyBookHistoryProps) {
  const dispatch = useAppDispatch();

  const openEditModal = () =>
    dispatch(openEditMyBookHistory({ selectedHistory }));
  const openDeleteModal = () =>
    dispatch(openDeleteMyBookHistory({ selectedHistory }));

  return (
    <div className="flex flex-col max-h-[75vh] gap-4 p-4">
      <div className="flex-grow space-y-4 overflow-y-auto scrollbar-none gap-4">
        <MyBookHistoryReadDate history={selectedHistory} />
        <div className="grid grid-cols-2 gap-4">
          <MyBookHistoryReadPage history={selectedHistory} />
          <MyBookHistoryReadTime history={selectedHistory} />
        </div>
        <MyBookHistoryReadingMood history={selectedHistory} />
        <MyBookHistoryMemo history={selectedHistory} variant="full" />
        <MyBookHistoryCommentary history={selectedHistory} />
        <MyBookHistoryDateLabel history={selectedHistory} />
      </div>
      <div className="flex gap-4 mt-auto">
        <Button
          key="edit-modal-btn"
          type="button"
          onClick={openEditModal}
          className="flex-1"
        >
          수정하기
        </Button>
        <Button
          key="delete-modal-btn"
          variant="outline"
          type="button"
          onClick={openDeleteModal}
          className="flex-1"
        >
          삭제하기
        </Button>
      </div>
    </div>
  );
}
