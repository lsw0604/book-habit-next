'use client';

import { Button } from '@/components/ui/button';

import useErrorHandler from '@/hooks/error/useErrorHandler';
import useToastHook from '@/hooks/toast/useToastHook';
import { useAppDispatch, useAppSelector } from '@/store';
import { modalActions } from '@/store/features/modal/modal-action';
import { myBookCommentActions } from '@/store/features/my-book-comment/my-book-comment-action';
import { myBookCommentSelector } from '@/store/features/my-book-comment/my-book-comment-selector';
import useMyBookCommentMutation from '@/queries/my-book-comment/useMyBookCommentMutation';

export default function DeleteMyBookCommentModal() {
  const dispatch = useAppDispatch();
  const { successToast } = useToastHook();
  const { selectedComment } = useAppSelector(myBookCommentSelector);
  const { removeMyBookComment } = useMyBookCommentMutation();
  const { mutate, isError, error } = removeMyBookComment();

  const cancelHandler = () => {
    dispatch(modalActions.setModalState({ isOpen: false, type: undefined }));
  };

  const deleteHandler = () => {
    if (selectedComment) {
      mutate(selectedComment.id, {
        onSuccess: () => {
          successToast('한줄평 삭제에 성공했습니다.');
          dispatch(
            modalActions.setModalState({ isOpen: false, type: undefined })
          );
          dispatch(myBookCommentActions.clearMyBookComment());
        },
      });
    }
  };

  useErrorHandler(isError, error);

  return (
    <div className="w-full h-full flex flex-col gap-4 justify-center items-center">
      <h1 className="text-xl font-bold">해당 한줄평을 삭제하시겠어요?</h1>
      <div className="flex w-full gap-4">
        <Button className="w-full" onClick={deleteHandler}>
          네, 삭제할게요.
        </Button>
        <Button variant="outline" className="w-full" onClick={cancelHandler}>
          아니요, 취소할게요.
        </Button>
      </div>
    </div>
  );
}
