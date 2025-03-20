'use client';

import { useParams, useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

import { useAppDispatch } from '@/store';
import { setModalState } from '@/store/features/modal/modal-slice';

import { useMyBookMutation } from '@/hooks/my-book/useMyBookQueries';
import useToastHook from '@/hooks/toast/useToastHook';
import useErrorHandler from '@/hooks/error/useErrorHandler';

export default function DeleteMyBookModal() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { my_book_id } = params;

  const {
    removeMyBook: { mutate, isError, error },
  } = useMyBookMutation();
  const { successToast } = useToastHook();

  const onClickDelete = () => {
    mutate(
      {
        myBookId: Number(my_book_id),
      },
      {
        onSuccess: response => {
          dispatch(setModalState({ isOpen: false, type: undefined }));
          router.push('/my_books');
          successToast('나의 책 삭제에 성공했습니다.');
        },
      }
    );
  };

  const onClickCancel = () => {
    dispatch(setModalState({ isOpen: false, type: undefined }));
  };

  useErrorHandler(isError, error);

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <h1 className="text-2xl font-bold">해당 책을 삭제하시겠어요?</h1>
      <div className="flex w-full gap-4">
        <Button className="w-full" onClick={onClickDelete}>
          네, 삭제할게요.
        </Button>
        <Button variant="outline" className="w-full" onClick={onClickCancel}>
          아니요, 취소할게요.
        </Button>
      </div>
    </div>
  );
}
