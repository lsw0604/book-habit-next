import { ReadingMood } from '../../model';
import { MoodSelectorOption } from './types';

export const MOOD_SELECTOR_OPTIONS: MoodSelectorOption[] = [
  {
    value: ReadingMood.INSPIRED,
    label: '영감을 받았어요',
    emoji: '💡',
    color: 'bg-yellow-100 border-yellow-400',
    check: 'text-yellow-400',
  },
  {
    value: ReadingMood.EXCITED,
    label: '신나요!',
    emoji: '🤩',
    color: 'bg-pink-100 border-pink-400',
    check: 'text-pink-400',
  },
  {
    value: ReadingMood.INTRIGUED,
    label: '흥미로웠어요',
    emoji: '🧐',
    color: 'bg-purple-100 border-purple-400',
    check: 'text-purple-400',
  },
  {
    value: ReadingMood.SATISFIED,
    label: '만족스러웠어요',
    emoji: '😌',
    color: 'bg-green-100 border-green-400',
    check: 'text-green-400', // check 속성 추가
  },
  {
    value: ReadingMood.NEUTRAL,
    label: '그냥 그래요',
    emoji: '😐',
    color: 'bg-gray-100 border-gray-400',
    check: 'text-gray-400', // check 속성 추가
  },
  {
    value: ReadingMood.CONFUSED,
    label: '헷갈려요',
    emoji: '😕',
    color: 'bg-orange-100 border-orange-400',
    check: 'text-orange-400', // check 속성 추가
  },
  {
    value: ReadingMood.DISAPPOINTED,
    label: '실망했어요',
    emoji: '😞',
    color: 'bg-red-100 border-red-400',
    check: 'text-red-400', // check 속성 추가
  },
  {
    value: ReadingMood.BORED,
    label: '지루해요',
    emoji: '😴',
    color: 'bg-gray-200 border-gray-500',
    check: 'text-gray-500', // check 속성 추가
  },
  {
    value: ReadingMood.EMOTIONAL,
    label: '감동적이었어요',
    emoji: '😢',
    color: 'bg-blue-100 border-blue-400',
    check: 'text-blue-400', // check 속성 추가
  },
  {
    value: ReadingMood.THOUGHTFUL,
    label: '생각할 거리가 많아요',
    emoji: '🤔',
    color: 'bg-indigo-100 border-indigo-400',
    check: 'text-indigo-400', // check 속성 추가
  },
  {
    value: ReadingMood.CHALLENGED,
    label: '도전 정신이 생겨요',
    emoji: '💪',
    color: 'bg-amber-100 border-amber-400',
    check: 'text-amber-400', // check 속성 추가
  },
  {
    value: ReadingMood.ENLIGHTENED,
    label: '새로운 것을 깨달았어요',
    emoji: '✨',
    color: 'bg-teal-100 border-teal-400',
    check: 'text-teal-400',
  },
] as const;

export const MOOD_SELECTOR_STYLE = {
  container: 'flex flex-wrap gap-2',
  button: {
    base: 'flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 transition-all duration-200',
    hover: 'hover:scale-105 hover:shadow-md',
    on: 'shadow-lg transform scale-105',
    off: 'hover:opacity-80',
  },
  emoji: 'text-base',
  label: 'text-xs font-medium text-gray-700',
};
