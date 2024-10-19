import { useState, MouseEvent } from 'react';

import { Button } from '@/components/ui/button';
import MyBookCommentItem from './my_book_comment_item';
import { useAppDispatch, useAppSelector } from '@/store';
import { modalActions } from '@/store/features/modal/modal-action';
import MyBookCommentItemEdit from './my_book_comment_item_edit';
import { myBookCommentActions } from '@/store/features/my-book-comment/my-book-comment-action';
import { myBookCommentSelector } from '@/store/features/my-book-comment/my-book-comment-selector';

export default function MyBookCommentItemDetail({
  ...props
}: MyBookCommentItemType) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isEdit } = useAppSelector(myBookCommentSelector);

  const dispatch = useAppDispatch();

  const deleteHandler = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(
      modalActions.setModalState({
        isOpen: true,
        type: 'delete-my-book-comment',
      })
    );
  };

  const updateHandler = (event: MouseEvent) => {
    event.stopPropagation();
    // dispatch(
    //   modalActions.setModalState({
    //     isOpen: true,
    //     type: 'update-my-book-comment',
    //   })
    // );
    dispatch(myBookCommentActions.setMyBookCommentEdit(true));
  };

  const containerHandler = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div className="w-full h-auto">
      {!isEdit ? (
        <MyBookCommentItem
          {...props}
          onClick={() => setIsOpen((prev) => !prev)}
          classNames={{ content: { comment: 'h-auto' } }}
        >
          {isOpen ? (
            <div
              className="w-full h-10 flex"
              onClick={(e) => containerHandler(e)}
            >
              <div className="flex gap-4 ml-auto">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={(e) => deleteHandler(e)}
                >
                  삭제하기
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={(e) => updateHandler(e)}
                >
                  수정하기
                </Button>
              </div>
            </div>
          ) : null}
        </MyBookCommentItem>
      ) : (
        <MyBookCommentItemEdit />
      )}
    </div>
  );
}
