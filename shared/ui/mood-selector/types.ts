import type { ReadingMood } from '@/entities/my-book-history/model';

export interface MoodSelectorOption {
  value: ReadingMood;
  label: string;
  emoji: string;
}
