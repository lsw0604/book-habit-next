import { z } from 'zod';

const ReadingMoods = [
  'INSPIRED',
  'EXCITED',
  'INTRIGUED',
  'SATISFIED',
  'NEUTRAL',
  'CONFUSED',
  'DISAPPOINTED',
  'BORED',
  'EMOTIONAL',
  'THOUGHTFUL',
  'CHALLENGED',
  'ENLIGHTENED',
] as const;

export const ReadingMoodSchema = z.enum(ReadingMoods);
export type ReadingMood = z.infer<typeof ReadingMoodSchema>;

export const addMyBookHistorySchema = z
  .object({
    myBookId: z
      .number()
      .int()
      .positive({ message: '도서 ID는 필수이며, 양의 정수여야 합니다.' }),
    startPage: z
      .number()
      .int()
      .min(0, { message: '시작 페이지는 0 이상이어야 합니다.' }),
    endPage: z
      .number()
      .int()
      .min(0, { message: '종료 페이지는 0 이상이어야 합니다.' }),
    startTime: z.date({
      required_error: '시작 시간은 필수입니다.',
      invalid_type_error: '유효한 날짜 형식이 아닙니다.',
    }),
    endTime: z.date({
      required_error: '종료 시간은 필수입니다.',
      invalid_type_error: '유효한 날짜 형식이 아닙니다.',
    }),
    readingMinutes: z
      .number()
      .int()
      .min(0, { message: '독서 시간(분)은 0 이상이어야 합니다.' }),
    date: z.date({
      required_error: '독서 날짜는 필수입니다.',
      invalid_type_error: '유효한 날짜 형식이 아닙니다.',
    }),
    memo: z.string().optional(), // 선택적 필드
    readingMood: ReadingMoodSchema, // 위에서 정의한 ReadingMood enum 스키마 사용
  })
  .refine(data => data.endPage >= data.startPage, {
    message: '종료 페이지는 시작 페이지보다 크거나 같아야 합니다.',
    path: ['endPage'], // 오류 메시지를 endPage 필드에 연결
  })
  .refine(data => data.endTime >= data.startTime, {
    message: '종료 시간은 시작 시간보다 뒤여야 하거나 같아야 합니다.',
    path: ['endTime'], // 오류 메시지를 endTime 필드에 연결
  });

export type AddMyBookHistoryType = z.infer<typeof addMyBookHistorySchema>;

export const DEFAULT_ADD_MY_BOOK_HISTORY: AddMyBookHistoryType = {
  myBookId: 0, // 또는 0, null 등 초기 상태에 따라 적절히 설정
  startPage: 0,
  endPage: 0,
  startTime: new Date(), // 현재 시간으로 초기화
  endTime: new Date(), // 현재 시간으로 초기화
  readingMinutes: 0,
  date: new Date(), // 현재 날짜로 초기화
  memo: '',
  readingMood: 'NEUTRAL', // 기본 감정 상태
};
