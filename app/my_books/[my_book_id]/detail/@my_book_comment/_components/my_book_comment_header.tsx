import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/store';
import { modalActions } from '@/store/features/modal/modal-action';

interface MyBookCommentHeaderProps {
  comment: MyBookCommentItemType[];
  myBookId: number;
}

export default function MyBookCommentHeader({
  comment,
  myBookId,
}: MyBookCommentHeaderProps) {
  if (!comment) throw Error('comment의 데이터를 찾을 수 없습니다.');
  if (!myBookId) throw Error('myBookId값이 존재하지 않습니다.');
  const dispatch = useAppDispatch();

  const openMyBookCommentRegistrationModal = () => {
    dispatch(
      modalActions.setModalState({
        isOpen: true,
        type: 'register-my-book-comment',
      })
    );
  };

  return (
    <header className="mb-2 flex align-items text-2xl font-bold tracking-normal overflow-hidden">
      <h2 className="text-2xl font-bold inline-flex items-center">코멘트</h2>
      <span className="ml-2 inline-flex items-center text-gray-300 text-base tracking-normal font-normal">
        {comment.length}
      </span>
      <div className="ml-auto text-base">
        <div className="my-3">
          {comment.length === 0 ? (
            <Button
              variant="ghost"
              type="button"
              onClick={openMyBookCommentRegistrationModal}
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          ) : (
            <Link href={`/my_books/${myBookId}/comment`}>더보기</Link>
          )}
        </div>
      </div>
    </header>
  );
}
