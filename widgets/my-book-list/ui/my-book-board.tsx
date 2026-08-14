'use client';

import { MyBookStatus } from '@/entities/my-book';
import { useFilterMyBookParams } from '@/features/filter-my-book';

import { MyBookBoardColumn } from './my-book-board-column';

/** 칸반 컬럼 순서 — 독서 진행 흐름을 따른다 */
const BOARD_COLUMNS: readonly MyBookStatus[] = [
  MyBookStatus.WANT_TO_READ,
  MyBookStatus.CURRENTLY_READING,
  MyBookStatus.READ,
];

/**
 * PC 전용 칸반 보드.
 * 상태별로 독립된 컬럼을 두므로 필터의 status는 사용하지 않고 order만 반영한다.
 *
 * 높이는 AppShell의 main이 확정해 주므로 flex 체인만으로 충분하다.
 */
export function MyBookBoard() {
  const { order } = useFilterMyBookParams();

  return (
    <div className="flex min-h-0 flex-1 gap-4 px-4 pb-4">
      {BOARD_COLUMNS.map(status => (
        <MyBookBoardColumn key={status} status={status} order={order} />
      ))}
    </div>
  );
}
