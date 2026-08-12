import { useModal } from "@/entities/modal";
import { type MyBookDetail, MyBookStatus } from "@/entities/my-book";
import { useDeleteMyBook } from "@/features/delete-my-book";

import { useUpdateMyBook } from "./useUpdateMyBook";

interface UseUpdateMyBookActionProps {
  data: MyBookDetail;
}

export function useUpdateMyBookAction({
  data
}: UseUpdateMyBookActionProps) {
  const { id, status } = data;
  // eslint-disable-next-line no-underscore-dangle -- _count is the API's field name
  const { history, review } = data._count;
  const { mutateAsync: updateMutateAsync } = useUpdateMyBook();
  const { mutateAsync: deleteMutateAsync } = useDeleteMyBook();
  const { open } = useModal();

  const hasActivityHistory = history > 0 || review > 0;

  const removeMyBook = async () => {
    if (hasActivityHistory) {
      open('DELETE_MY_BOOK', { myBookId: id });
    } else {
      await deleteMutateAsync(id);
    }
  };

  const handleReadingClick = async () => {
    if (status !== MyBookStatus.CURRENTLY_READING) {
      await updateMutateAsync({ id, status: MyBookStatus.CURRENTLY_READING, rating: 0 });
      return;
    }
    await removeMyBook();
  };

  const handleWantToReadClick = async () => {
    if (status !== MyBookStatus.WANT_TO_READ) {
      await updateMutateAsync({ id, status: MyBookStatus.WANT_TO_READ, rating: 0 });
      return;
    }
    await removeMyBook();
  };

  const handleChangeRating = async (rating: number) => {
    if (rating === 0) {
      await removeMyBook();
      return;
    }
    await updateMutateAsync({ id, status: MyBookStatus.READ, rating });
  };

  return {
    isReading: status === MyBookStatus.CURRENTLY_READING,
    isWantToRead: status === MyBookStatus.WANT_TO_READ,
    handleReadingClick,
    handleWantToReadClick,
    handleChangeRating,
  };
}
