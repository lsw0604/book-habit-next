export const DATE_CONSTRAINTS = {
  MIN_YEAR: 1900,
  MAX_YEAR: 2100,
  MIN_MONTH: 1,
  MAX_MONTH: 12,
  MAX_DIGITS: 8,
} as const;

export const ERROR_MESSAGES = {
  INVALID_YEAR: `${DATE_CONSTRAINTS.MIN_YEAR}년에서 ${DATE_CONSTRAINTS.MAX_YEAR}년 사이 년도를 입력해주세요.`,
  INVALID_MONTH: `0${DATE_CONSTRAINTS.MIN_MONTH}월에서 ${DATE_CONSTRAINTS.MAX_MONTH}월 사이 월을 입력해주세요.`,
  INVALID_DATE: '유효하지 않은 날짜입니다. (예: 2월 30일)',
} as const;

export const DATE_FORMAT = {
  INPUT: 'yyyy-MM-dd',
  PARSE: 'yyyyMMdd',
} as const;

export const DATE_LENGTH = {
  YEAR: 4,
  MONTH: 6,
  DAY: 8,
} as const;
