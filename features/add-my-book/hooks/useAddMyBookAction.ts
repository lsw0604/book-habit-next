import { useModal } from "@/entities/modal";

import { useAddFinishedBook, useAddReadingBook, useAddWantToRead } from "./useAddMyBook";

interface UseAddMyBookActionParams {
  isbn: string;
}

export const useAddMyBookAction = ({ isbn }: UseAddMyBookActionParams) => {
  const { mutate: mutateAddFinishedBook } = useAddFinishedBook();
  const { mutate: mutateAddReadingBook } = useAddReadingBook();
  const { mutate: mutateAddWantToRead } = useAddWantToRead();
  const { open } = useModal();

  const handleReadingClick = () => {
    mutateAddReadingBook(isbn);
  }

  const handleWantToReadClick = () => {
    mutateAddWantToRead(isbn);
  }

  const handleFinishedClick = (rating: number) => {
    mutateAddFinishedBook({ rating, isbn })
  }

  const handleModalClick = () => {
    open('ADD_MY_BOOK_WITH_REVIEW', { isbn });
  }

  return {
    handleFinishedClick,
    handleModalClick,
    handleReadingClick,
    handleWantToReadClick
  }

}
