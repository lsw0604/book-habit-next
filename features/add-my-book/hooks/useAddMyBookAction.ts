import {
  useAddFinishedBook,
  useAddReadingBook,
  useAddWantToRead,
} from './useAddMyBook';

interface UseAddMyBookActionParams {
  isbn: string;
}

export const useAddMyBookAction = ({ isbn }: UseAddMyBookActionParams) => {
  const { mutate: mutateAddFinishedBook } = useAddFinishedBook();
  const { mutate: mutateAddReadingBook } = useAddReadingBook();
  const { mutate: mutateAddWantToRead } = useAddWantToRead();

  const handleWantToReadClick = () => {
    mutateAddWantToRead(isbn);
  };

  const handleReadingClick = () => {
    mutateAddReadingBook(isbn);
  };

  /** 별점은 서재에 담긴 뒤 '읽음' 상태에서 매긴다 */
  const handleReadClick = () => {
    mutateAddFinishedBook({ isbn, rating: 0 });
  };

  return {
    handleWantToReadClick,
    handleReadingClick,
    handleReadClick,
  };
};
