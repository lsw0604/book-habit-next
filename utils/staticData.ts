import { customize } from 'style/colors';

export const STATUS_COLOR_OBJECT: Record<HistoryStatusType, string> = {
  읽는중: 'bg-rose-300',
  다읽음: 'bg-teal-300',
  읽기시작함: 'bg-yellow-300',
  읽고싶음: 'bg-orange-300',
};

export const STATUS_WORD_OBJECT: Record<HistoryStatusType, string> = {
  읽기시작함: '읽기 시작했어요.',
  다읽음: '다 읽었어요.',
  읽고싶음: '찜했어요.',
  읽는중: '읽었어요.',
};

export const STATUS_OBJECT: Record<'다읽음' | '읽기전' | '읽는중', string> = {
  다읽음: '다 읽고서 남긴',
  읽는중: '읽는중에 남긴',
  읽기전: '읽기전에 남긴',
};

export const COMMENT_HASHTAG_LOADER_SIZES: string[] = [
  '2rem',
  '6rem',
  '4rem',
  '8rem',
  '4rem',
  '6rem',
  '8rem',
  '2rem',
  '6rem',
  '8rem',
  '2rem',
  '4rem',
];

export const COL_START_OBJ: {
  [key: number]: string;
} = {
  1: 'col-start-1',
  2: 'col-start-2',
  3: 'col-start-3',
  4: 'col-start-4',
  5: 'col-start-5',
  6: 'col-start-6',
  7: 'col-start-7',
};

export const GRID_ROW_OBJ: {
  [key: number]: string;
} = {
  1: 'grid-rows-1',
  2: 'grid-rows-2',
  3: 'grid-rows-3',
  4: 'grid-rows-4',
  5: 'grid-rows-5',
  6: 'grid-rows-6',
};
