import { useModal } from '@/entities/modal';
import { type MyBookDetail, MyBookStatus } from '@/entities/my-book';
import { useDeleteMyBook } from '@/features/delete-my-book';

import { useUpdateMyBook } from './useUpdateMyBook';

interface UseUpdateMyBookActionProps {
  data: MyBookDetail;
}

export function useUpdateMyBookAction({ data }: UseUpdateMyBookActionProps) {
  const { id, status, rating } = data;
  // eslint-disable-next-line no-underscore-dangle -- _count is the API's field name
  const { history, review } = data._count;
  const { mutateAsync: updateMutateAsync } = useUpdateMyBook();
  const { mutateAsync: deleteMutateAsync } = useDeleteMyBook();
  const { open } = useModal();

  const hasActivityHistory = history > 0 || review > 0;

  /** 이미 선택된 상태를 다시 눌러도 아무 일도 일어나지 않는다 (삭제는 별도 액션) */
  const changeStatus = async (next: MyBookStatus) => {
    if (status === next) return;

    await updateMutateAsync({
      id,
      status: next,
      // '읽음'에서 벗어나면 별점은 의미가 없으므로 초기화한다
      rating: next === MyBookStatus.READ ? rating : 0,
    });
  };

  const handleWantToReadClick = () => changeStatus(MyBookStatus.WANT_TO_READ);
  const handleReadingClick = () => changeStatus(MyBookStatus.CURRENTLY_READING);
  const handleReadClick = () => changeStatus(MyBookStatus.READ);

  const handleChangeRating = async (nextRating: number) => {
    await updateMutateAsync({
      id,
      status: MyBookStatus.READ,
      rating: nextRating,
    });
  };

  const handleRemoveClick = async () => {
    if (hasActivityHistory) {
      open('DELETE_MY_BOOK', { myBookId: id });
      return;
    }
    await deleteMutateAsync(id);
  };

  return {
    isWantToRead: status === MyBookStatus.WANT_TO_READ,
    isReading: status === MyBookStatus.CURRENTLY_READING,
    isRead: status === MyBookStatus.READ,
    rating,
    handleWantToReadClick,
    handleReadingClick,
    handleReadClick,
    handleChangeRating,
    handleRemoveClick,
  };
}
