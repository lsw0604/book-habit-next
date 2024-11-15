import { useMemo, useState } from 'react';

interface MyBookHistoryListProps {
  data: ResponseGetMyBookHistory;
  calendar: CalendarDetailType;
}

export default function MyBookHistoryList({
  data,
  calendar,
}: MyBookHistoryListProps) {
  const [page, setPage] = useState<number>(1);
  const useGroupedByMonth = (data: ResponseGetMyBookHistory) => {
    const groupedByMonth = useMemo(() => {
      const result: Record<string, MyBookHistoryItemType[]> = {};

      Object.entries(data).forEach(([date, items]) => {
        const month = date.substring(0, 7);
        if (!result[month]) {
          result[month] = [];
        }
        result[month].push(...items);
      });

      return result;
    }, [data]);

    return groupedByMonth;
  };

  const currentMonthData =
    useGroupedByMonth(data)[`${calendar.year}-${calendar.month}`] || [];
  const totalPages = Math.ceil(currentMonthData.length / 3);
  const paginatedData = currentMonthData.slice((page - 1) * 3, page * 3);
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <>
      <ul className="w-full h-auto grid">
        {paginatedData.map((element) => (
          <li key={element.id}>{element.page}</li>
        ))}
      </ul>
      <div className="flex justify-center mt-4">
        {' '}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          {' '}
          이전{' '}
        </button>{' '}
        <span>
          {page} / {totalPages}
        </span>{' '}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          {' '}
          다음{' '}
        </button>
      </div>
    </>
  );
}
