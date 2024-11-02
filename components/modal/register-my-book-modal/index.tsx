import { Button } from '@/components/ui/button';
import BookDetail from './_components/book-detail';

import { useAppDispatch, useAppSelector } from '@/store';
import { bookSelector } from '@/store/features/book/book-selector';
import { modalActions } from '@/store/features/modal/modal-action';
import useToastHook from '@/hooks/toast/useToastHook';
import useMyBookRegistrationForm from '@/hooks/form/my-book/useMyBookRegistrationForm';
import { MyBookRegistrationSchemaType } from '@/hooks/form/my-book/schema/registration.schema';
import { useMyBookMutation } from '@/service/my-book/useMyBookService';
import { ErrorMessage } from '@/components/common/error-message';

export default function RegisterMyBookModal() {
  const book = useAppSelector(bookSelector);
  const { successToast } = useToastHook();
  const dispatch = useAppDispatch();
  const {
    addMyBook: { mutate, isPending, isError, error },
  } = useMyBookMutation();
  const {
    handleSubmit,
    formState: { errors },
  } = useMyBookRegistrationForm({ ...book });

  const modalHandler = () => {
    dispatch(modalActions.setModalState({ isOpen: false, type: undefined }));
  };

  const onSubmit = (data: MyBookRegistrationSchemaType) => {
    mutate(data, {
      onSuccess: () => {
        successToast('나의서재에 등록하는데 성공했습니다.');
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} key={book.isbn[0]}>
      <BookDetail detail={book} errors={errors} />
      {isError && error && error.response && (
        <ErrorMessage>{error.response.data.message}</ErrorMessage>
      )}
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
