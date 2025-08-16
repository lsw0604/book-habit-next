import type { ReadingMood } from '@/entities/my-book-history/model';

import type { MoodSelectorOption } from './types';

export const MOOD_SELECTOR_OPTIONS: MoodSelectorOption[] = [
  { value: 'INSPIRED', label: '영감을 받았어요', emoji: '💡' },
  { value: 'EXCITED', label: '신나요!', emoji: '🤩' },
  { value: 'INTRIGUED', label: '흥미로웠어요', emoji: '🧐' },
  { value: 'SATISFIED', label: '만족스러웠어요', emoji: '😌' },
  { value: 'NEUTRAL', label: '그냥 그래요', emoji: '😐' },
  { value: 'CONFUSED', label: '헷갈려요', emoji: '😕' },
  { value: 'DISAPPOINTED', label: '실망했어요', emoji: '😞' },
  { value: 'BORED', label: '지루해요', emoji: '😴' },
  { value: 'EMOTIONAL', label: '감동적이었어요', emoji: '😢' },
  { value: 'THOUGHTFUL', label: '생각할 거리가 많아요', emoji: '🤔' },
  { value: 'CHALLENGED', label: '도전 정신이 생겨요', emoji: '💪' },
  { value: 'ENLIGHTENED', label: '새로운 것을 깨달았어요', emoji: '✨' },
];

export const MOOD_SELECTOR_STYLE = {
  container: 'flex flex-wrap gap-2',
  button:
    'flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors duration-200 hover:bg-accent hover:text-accent-foreground',
  selected: 'bg-primary text-primary-foreground hover:bg-primary/90',
  emoji: 'text-base',
  label: 'text-xs font-medium',
  check: 'size-4',
};
