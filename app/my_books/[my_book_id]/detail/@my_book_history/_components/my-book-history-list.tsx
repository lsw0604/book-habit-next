import { useAppSelector } from '@/store';
import { myBookHistorySelector } from '@/store/features/my-book-history/my-book-history-selector';
import { useMemo, useState } from 'react';

export default function MyBookHistoryList() {
  const { selectedHistory } = useAppSelector(myBookHistorySelector);
  return (
    <>
      {selectedHistory ? (
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center mb-3 px-4">
            <h3 className="text-md font-semibold">2024년 11월 28일 기록</h3>
            <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
              새 기록
            </button>
          </div>
          <div className="text-sm text-gray-500 text-center py-3">
            등록된 기록이 없습니다.
          </div>
        </div>
      ) : null}
    </>
  );
}
