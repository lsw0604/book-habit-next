import { MOOD_SELECTOR_OPTIONS } from '../constants';
import { ReadingMood } from '../model';

export function calculatePages(startPage: number, endPage: number): number {
  if (startPage === 0 && endPage === 0) return 0;
  if (startPage > endPage) return 0;

  return endPage - startPage + 1;
}

export function pickRandomMessage(messages: string[]): string {
  return messages[Math.floor(Math.random() * messages.length)];
}

export function calculatePagesPerMinute(
  pages: number,
  minutes: number
): number {
  if (minutes <= 0 || pages <= 0) {
    return 0;
  }
  return pages / minutes;
}

export function calculatePagesTier(pages: number) {
  if (pages === 0) return 0;
  if (pages > 0 && pages <= 10) return 1;
  if (pages > 10 && pages <= 30) return 2;
  if (pages > 30 && pages <= 50) return 3;
  if (pages > 50) return 4;
  return 0;
}

export function calculateTimeTier(minutes: number) {
  if (minutes === 0) return 0;
  if (minutes > 0 && minutes <= 10) return 1;
  if (minutes > 10 && minutes <= 30) return 2;
  if (minutes > 30 && minutes <= 60) return 3;
  if (minutes > 60) return 4;
  return 0;
}

export function calculatePpmTier(ppm: number) {
  if (ppm === 0) return 0;
  if (ppm > 0 && ppm <= 0.5) return 1;
  if (ppm > 0.5 && ppm <= 1) return 2;
  if (ppm > 1 && ppm <= 1.5) return 3;
  if (ppm > 1.5) return 4;
  return 0;
}

export const parseMoodLabel = (
  readingMood: ReadingMood
): { emoji: string; label: string } => {
  const moodOption = MOOD_SELECTOR_OPTIONS.find(
    option => option.value === readingMood
  );

  const moodLabel = moodOption?.label;

  if (!moodLabel) {
    return { emoji: '😐', label: '그냥 그래요.' };
  }
  const [emoji, ...labelParts] = moodLabel.split(' ');
  return { emoji, label: labelParts.join(' ') };
};

export const truncateMemo = (memo?: string, maxLength = 70): string => {
  if (!memo) return '등록된 메모가 없습니다.';
  return memo.length > maxLength ? `${memo.substring(0, maxLength)}...` : memo;
};
