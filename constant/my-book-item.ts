export const MY_BOOK_ITEM_RATINGS = [
  {
    rating: 0,
    text: '평가 없음',
  },
  {
    rating: 1,
    text: '⭐',
  },
  {
    rating: 2,
    text: '⭐⭐',
  },
  {
    rating: 3,
    text: '⭐⭐⭐',
  },
  {
    rating: 4,
    text: '⭐⭐⭐⭐',
  },
  {
    rating: 5,
    text: '⭐⭐⭐⭐⭐',
  },
] as const;

export const MY_BOOK_ITEM_STATUS: {
  status: MyBookStatusType;
  value: MyBookStatusType;
  label: string;
}[] = [
  {
    status: 'TO_READ',
    value: 'TO_READ',
    label: '아직 읽기전이에요.',
  },
  {
    status: 'START_READ',
    value: 'START_READ',
    label: '읽기 시작했어요.',
  },
  {
    status: 'READING',
    value: 'READING',
    label: '아직 읽는 중이에요.',
  },
  {
    status: 'READ',
    value: 'READ',
    label: '다 읽었어요.',
  },
] as const;

export const MY_BOOK_STATUS: MyBookStatusType[] = [
  'READING',
  'READ',
  'TO_READ',
  'START_READ',
] as const;
