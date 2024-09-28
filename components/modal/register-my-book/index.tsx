import { useCallback } from 'react';
import { Button } from '@/components/ui/button';
import BookDetail from './_components/book-detail';
import useCreateMyBookHook from '@/hooks/my-book/useCreateMyBookHook';
import { useAppDispatch, useAppSelector } from '@/store';
import { bookSelector } from '@/store/features/book/book-selector';
import { modalActions } from '@/store/features/modal/modal-action';

export default function RegisterMyBookModal() {
  const book = useAppSelector(bookSelector);
  const dispatch = useAppDispatch();

  const modalHandler = useCallback(() => {
    dispatch(modalActions.setModal({ isOpen: false }));
  }, []);

  const { onSubmit, handleSubmit, isPending } = useCreateMyBookHook(book);

  return (
    <form onSubmit={handleSubmit(onSubmit)} key={book.isbn[0]}>
      <BookDetail detail={book} />
      <div className="w-full flex flex-shrink-0 mt-2 gap-2">
        <Button className="w-full" isLoading={isPending} type="submit">
          등록하기
        </Button>
        <Button className="w-full" variant="ghost" onClick={modalHandler}>
          취소하기
        </Button>
      </div>
    </form>
  );
}
