'use client';

import MyBookCommentItem from './my_book_comment_item';
import MyBookCommentItemAdd from './my_book_comment_item_add';
import MyBookCommentListLoader from './my_book_comment_list_loader';

import useMyBookCommentQuery from '@/queries/my-book-comment/useMyBookCommentQuery';
import MyBookCommentItemDetail from './my_book_comment_item_detail';
import { useAppDispatch, useAppSelector } from '@/store';
import { myBookCommentSelector } from '@/store/features/my-book-comment/my-book-comment-selector';
import { myBookCommentActions } from '@/store/features/my-book-comment/my-book-comment-action';

export default function MyBookCommentList({
  my_book_id,
}: {
  my_book_id: number;
}) {
  const dispatch = useAppDispatch();
  const { selectedComment } = useAppSelector(myBookCommentSelector);
  const { data, isLoading } = useMyBookCommentQuery({ myBookId: my_book_id });

  if (!data || isLoading) return <MyBookCommentListLoader />;

  const listHandler = () => {
    dispatch(myBookCommentActions.clearMyBookComment());
  };

  return (
    <ul className="overflow-auto scrollbar-none">
      {selectedComment ? (
        <>
          <MyBookCommentItemDetail
            key={selectedComment.id}
            {...selectedComment}
          />
          <button
            onClick={listHandler}
            className="ml-auto mt-2 text-xs text-blue-500"
          >
            목록으로 돌아가기
          </button>
        </>
      ) : (
        <>
          <MyBookCommentItemAdd />
          {data.map((item) => (
            <li className="w-full h-auto p-0" key={item.id}>
              <MyBookCommentItem
                {...item}
                onClick={() =>
                  dispatch(myBookCommentActions.setMyBookComment(item))
                }
                classNames={{ content: { comment: 'line-clamp-2' } }}
              />
            </li>
          ))}
        </>
      )}
    </ul>
  );
}
