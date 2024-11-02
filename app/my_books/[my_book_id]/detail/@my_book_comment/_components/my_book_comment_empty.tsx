import { useAppDispatch } from '@/store';
import { modalActions } from '@/store/features/modal/modal-action';

export default function MyBookCommentEmpty() {
  const dispatch = useAppDispatch();
  const onClick = () => {
    dispatch(
      modalActions.setModalState({
        isOpen: true,
        type: 'register-my-book-comment',
      })
    );
  };
  return (
    <div
      onClick={onClick}
      className="flex flex-col h-full gap-2 p-2 border-2 transition-all text-left text-sm w-full mb-1 rounded-md"
    >
      {' '}
      저장된 Comment가 없습니다.
    </div>
  );
}
