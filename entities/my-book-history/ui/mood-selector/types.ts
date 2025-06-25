import { ReadingMood } from '../../model';

export interface MoodSelectorOption {
  value: ReadingMood;
  label: string;
  emoji: string;
  color: string;
  check: string;
}
