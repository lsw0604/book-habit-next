export const MY_BOOK_ITEM_RATINGS = [
  {
    rating: 0,
    text: '평가 없음',
  },
  {
    rating: 1,
    text: '1점 평가함',
  },
  {
    rating: 2,
    text: '2점 평가함',
  },
  {
    rating: 3,
    text: '3점 평가함',
  },
  {
    rating: 4,
    text: '4점 평가함',
  },
  {
    rating: 5,
    text: '5점 평가함',
  },
] as const;

export const MY_BOOK_ITEM_STATUS: { status: MyBookStatusType; text: string }[] =
  [
    {
      status: 'TO_READ',
      text: '읽을 예정',
    },
    {
      status: 'READING',
      text: '읽는 중',
    },
    {
      status: 'READ',
      text: '다 읽음',
    },
    {
      status: 'START_READ',
      text: '읽기 시작',
    },
  ] as const;

export const MY_BOOK_STATUS: MyBookStatusType[] = [
  'READING',
  'READ',
  'TO_READ',
  'START_READ',
] as const;
