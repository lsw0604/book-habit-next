import { ReadingMood } from '../../model/types';

export interface MoodSelectorOption {
  value: ReadingMood;
  label: string;
  emoji: string;
  color: string;
  check: string;
}
