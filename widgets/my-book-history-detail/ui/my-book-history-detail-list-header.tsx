import Link from 'next/link';

import { Button } from '@/shared/ui/button';

interface MyBookHistoryDetailListHeaderProps {
  myBookId: number;
  onAdd: () => void;
  addDisabled: boolean;
}

export function MyBookHistoryDetailListHeader({
  myBookId,
  onAdd,
  addDisabled,
}: MyBookHistoryDetailListHeaderProps) {
  return (
    <div className="flex justify-between items-center px-2">
      <Link href={`/my_books/${myBookId}/history`}>
        <h3 className="text-base font-bold hover:underline">
          독서기록 전체보기
        </h3>
      </Link>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="-mr-2"
        disabled={addDisabled}
        onClick={onAdd}
      >
        독서 기록하기
      </Button>
    </div>
  );
}
