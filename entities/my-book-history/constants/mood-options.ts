import { ChipSelectorOption } from '@/shared/ui/chip-selector';

import { ReadingMood } from '../model';

export const MOOD_SELECTOR_OPTIONS: ChipSelectorOption<ReadingMood>[] = [
  { value: ReadingMood.NEUTRAL, label: '😐 그냥 그래요' },
  { value: ReadingMood.INSPIRED, label: '💡 영감을 받았어요' },
  { value: ReadingMood.EXCITED, label: '🤩 신나요!' },
  { value: ReadingMood.INTRIGUED, label: '🧐 흥미로웠어요' },
  { value: ReadingMood.SATISFIED, label: '😌 만족스러웠어요' },
  { value: ReadingMood.CONFUSED, label: '😕 헷갈려요' },
  { value: ReadingMood.DISAPPOINTED, label: '😞 실망했어요' },
  { value: ReadingMood.BORED, label: '😴 지루해요' },
  { value: ReadingMood.EMOTIONAL, label: '😢 감동적이었어요' },
  {
    value: ReadingMood.THOUGHTFUL,
    label: '🤔 생각할 거리가 많아요',
  },
  {
    value: ReadingMood.CHALLENGED,
    label: '💪 도전 정신이 생겨요',
  },
  {
    value: ReadingMood.ENLIGHTENED,
    label: '✨ 새로운 것을 깨달았어요',
  },
];
