import { format } from 'date-fns';

/**
 * 'date' 속성을 가진 객체들의 배열을 날짜별로 그룹화합니다.
 * 각 날짜는 'yyyy-MM-dd' 형식의 문자열 키로 사용됩니다.
 *
 * @template T - 배열의 아이템 타입. 아이템은 반드시 'date'라는 이름의 Date 객체 속성을 가져야 합니다.
 * @param {T[]} [items] - 그룹화할 아이템들의 배열. 각 아이템은 'date' 속성을 포함해야 합니다. 선택적 매개변수입니다.
 * @returns {{ [date: string]: T[] }} 날짜 문자열을 키로, 해당 날짜의 아이템 배열을 값으로 가지는 객체를 반환합니다.
 * 입력된 아이템이 없거나 undefined이면 빈 객체를 반환합니다.
 * @example
 * ```ts
 * const data = [
 * { id: 1, value: 'a', date: new Date('2024-01-01T10:00:00Z') },
 * { id: 2, value: 'b', date: new Date('2024-01-01T12:00:00Z') },
 * { id: 3, value: 'c', date: new Date('2024-01-02T15:00:00Z') },
 * ];
 * const grouped = groupItemsByDate(data);
 * grouped 결과:
 *   {
 *    '2024-01-01': [
 *      { id: 1, value: 'a', date: new Date('2024-01-01T10:00:00Z') },
 *      { id: 2, value: 'b', date: new Date('2024-01-01T12:00:00Z') }
 *    ],
 *    '2024-01-02': [
 *      { id: 3, value: 'c', date: new Date('2024-01-02T15:00:00Z') }
 *    ]
 *  }
 * ```
 */
export function groupItemsByDate<T extends { date: Date }>(items: T[] = []) {
  return items.reduce(
    (acc, item) => {
      const formattedDate = format(item.date, 'yyyy-MM-dd');

      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }

      acc[formattedDate].push(item);

      return acc;
    },
    {} as { [date: string]: T[] }
  );
}
