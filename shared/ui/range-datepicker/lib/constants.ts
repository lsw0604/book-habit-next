export const RANGE_DATEPICKER_MESSAGES = {
  DEFAULT: '날짜를 선택해주세요.',
  SELECT_END_DATE: (startDate: string) => `${startDate} - 종료 날짜 선택`,
  RANGE_SELECTED: (startDate: string, endDate: string) =>
    `${startDate} ~ ${endDate}`,
  UNEXPECTED_ERROR: '예기치 못한 에러가 발생했습니다.',
} as const;
