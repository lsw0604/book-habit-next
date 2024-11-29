import { useAppSelector } from '@/store';
import { myBookHistorySelector } from '@/store/features/my-book-history/my-book-history-selector';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

export default function MyBookHistoryList() {
  const { selectedDate, selectedHistory } = useAppSelector(
    myBookHistorySelector
  );
  return (
    <>
      {selectedDate ? (
        <div className="mt-6 border-t pt-4">
          <div className="flex justify-between items-center mb-3 px-4">
            <h3 className="text-md font-semibold">
              {dayjs(selectedDate).format('YYYY년 MM월 DD일')}
            </h3>
            <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
              새 기록
            </button>
          </div>
          {selectedHistory && selectedHistory.length > 0 ? (
            <div className="space-y-2">
              {selectedHistory.map((history) => (
                <div
                  key={history.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200 transition-colors flex justify-between items-center"
                >
                  <div className="flex w-full flex-col mb-2 gap-2">
                    <div className="text-base text-gray-500 ml-auto">
                      {history.page}Page
                    </div>
                    <div className="text-sm text-gray-600 bg-white p-2 rounded border border-gray-100 w-full">
                      {history.memo ? history.memo : '등록된 메모가 없습니다.'}
                    </div>
                    <div className="flex gap-2">
                      <button className="text-sm text-blue-500 hover:text-blue-700">
                        수정
                      </button>
                      <button className="text-sm text-red-500 hover:text-red-700">
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500 text-center py-3">
              등록된 기록이 없습니다.
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
