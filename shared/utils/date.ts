import {
  format,
  setHours,
  setMinutes,
  setSeconds,
  setMilliseconds,
} from 'date-fns';

const DATE_FORMAT = 'yyyy-MM-dd';

export const formatDateObjectToString = (date: Date): string => {
  return format(date, DATE_FORMAT);
};

/**
 * * baseDate의 날짜는 유지하면서, timeDate의 시간 정보만 가져와서 새로운 Date 객체를 반환합니다.
 */
export function preserveDateUpdateTime(baseDate: Date, timeDate: Date): Date {
  const hours = timeDate.getHours();
  const minutes = timeDate.getMinutes();
  const seconds = timeDate.getSeconds();

  const result = setMilliseconds(
    setSeconds(setMinutes(setHours(baseDate, hours), minutes), seconds),
    0
  );

  return result;
}
