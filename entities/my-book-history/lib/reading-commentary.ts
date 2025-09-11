import { getHours, isWeekend as validWeekend } from 'date-fns';

import { normalizedDate } from '@/shared/utils/date';

import {
  COMMENTARY_COLOR_MAP,
  COMMENTARY_MESSAGES,
  DEFAULT_STYLE,
} from '../constants';
import { MyBookHistory, ReadingMood, SerializedMyBookHistory } from '../model';

import {
  calculatePages,
  pickRandomMessage,
  calculatePagesPerMinute,
} from './my-book-history-utils';

type ReadingCommentaryPick =
  | 'endPage'
  | 'endTime'
  | 'startPage'
  | 'startTime'
  | 'readingMood'
  | 'readingMinutes';

type ReadingCommentaryType =
  | Pick<MyBookHistory, ReadingCommentaryPick>
  | Pick<SerializedMyBookHistory, ReadingCommentaryPick>;

export interface ReadingStyle {
  bgColor: string;
  borderColor: string;
  textColor: string;
}

export const generateReadingCommentaryColor = (
  history: ReadingCommentaryType
) => {
  const readPages = calculatePages(history.startPage, history.endPage);
  const pagesPerMInutes = calculatePagesPerMinute(
    readPages,
    history.readingMinutes
  );
  const startDate = normalizedDate(history.startTime);
  const endDate = normalizedDate(history.endTime);
  const startHour = getHours(startDate);
  const endHour = getHours(endDate);
  const isWeekend = validWeekend(startHour);
  const mood = history.readingMood;

  // ======================================================
  // 1. 최우선 순위 특별 케이스 (시간의 흐름)
  // ======================================================
  if (startDate.getDate() !== endDate.getDate()) {
    return COMMENTARY_COLOR_MAP.SPECIAL_CASES.OVERNIGHT_READING;
  }
  if (startHour < 5 && endHour >= 5) {
    return COMMENTARY_COLOR_MAP.SPECIAL_CASES.GREETING_THE_DAWN;
  }

  // ======================================================
  // 2. 이스터 에그 (감정 + 특정 조건 조합)
  // ======================================================
  if (
    mood === ReadingMood.THOUGHTFUL &&
    startHour >= 22 &&
    pagesPerMInutes >= 4
  ) {
    return COMMENTARY_COLOR_MAP.EASTER_EGGS.THOUGHTFUL_NIGHT;
  }
  if (
    mood === ReadingMood.EXCITED &&
    isWeekend &&
    history.readingMinutes >= 120
  ) {
    return COMMENTARY_COLOR_MAP.EASTER_EGGS.EXCITED_WEEKEND;
  }

  // ======================================================
  // 3. Mood 기반 스타일
  // ======================================================
  if (mood && COMMENTARY_COLOR_MAP.MOOD[mood]) {
    return COMMENTARY_COLOR_MAP.MOOD[mood];
  }

  // ======================================================
  // 4. Mood가 없거나 매칭되는 스타일이 없을 때의 Fallback
  // ======================================================
  return DEFAULT_STYLE;
};

export const generateReadingCommentary = (history: ReadingCommentaryType) => {
  const readPages = calculatePages(history.startPage, history.endPage);
  const pagesPerMInutes = calculatePagesPerMinute(
    readPages,
    history.readingMinutes
  );

  const startDate = normalizedDate(history.startTime);
  const endDate = normalizedDate(history.endTime);

  const startHour = getHours(startDate);
  const endHour = getHours(endDate);

  const isWeekend = validWeekend(startHour);

  const mood = history.readingMood;

  // ======================================================
  // 1. 최우선 순위 특별 케이스 (시간의 흐름)
  // ======================================================
  if (startDate.getDate() !== endDate.getDate()) {
    return COMMENTARY_MESSAGES.SPECIAL_CASES.OVERNIGHT_READING;
  }
  if (startHour < 5 && endHour >= 5) {
    return COMMENTARY_MESSAGES.SPECIAL_CASES.GREETING_THE_DAWN;
  }

  // ======================================================
  // 2. 이스터 에그 (감정 + 특정 조건 조합)
  // ======================================================
  if (
    mood === ReadingMood.THOUGHTFUL &&
    startHour >= 22 &&
    pagesPerMInutes >= 4
  ) {
    return COMMENTARY_MESSAGES.EASTER_EGGS.THOUGHTFUL_NIGHT;
  }
  if (
    mood === ReadingMood.EXCITED &&
    isWeekend &&
    history.readingMinutes >= 120
  ) {
    return COMMENTARY_MESSAGES.EASTER_EGGS.EXCITED_WEEKEND;
  }
  if (
    mood === ReadingMood.EMOTIONAL &&
    readPages < 20 &&
    history.readingMinutes > 30
  ) {
    return COMMENTARY_MESSAGES.EASTER_EGGS.EMOTIONAL_SHORT;
  }

  // ======================================================
  // 3. Mood 기반 메시지 (랜덤 선택용 배열)
  // ======================================================
  if (mood) {
    switch (mood) {
      case ReadingMood.EXCITED:
        return pickRandomMessage([...COMMENTARY_MESSAGES.MOOD.EXCITED]);
      case ReadingMood.INSPIRED:
        return pickRandomMessage([...COMMENTARY_MESSAGES.MOOD.INSPIRED]);
      case ReadingMood.EMOTIONAL:
        return pickRandomMessage([...COMMENTARY_MESSAGES.MOOD.EMOTIONAL]);
      case ReadingMood.THOUGHTFUL:
        return pickRandomMessage([...COMMENTARY_MESSAGES.MOOD.THOUGHTFUL]);
      case ReadingMood.ENLIGHTENED:
        return pickRandomMessage([...COMMENTARY_MESSAGES.MOOD.ENLIGHTENED]);
      case ReadingMood.SATISFIED:
        return pickRandomMessage([...COMMENTARY_MESSAGES.MOOD.SATISFIED]);
      case ReadingMood.INTRIGUED:
        return pickRandomMessage([...COMMENTARY_MESSAGES.MOOD.INTRIGUED]);
      case ReadingMood.CHALLENGED:
        return pickRandomMessage([...COMMENTARY_MESSAGES.MOOD.CHALLENGED]);
      case ReadingMood.DISAPPOINTED:
        return pickRandomMessage([...COMMENTARY_MESSAGES.MOOD.DISAPPOINTED]);
      case ReadingMood.CONFUSED:
        return pickRandomMessage([...COMMENTARY_MESSAGES.MOOD.CONFUSED]);
      case ReadingMood.BORED:
        return pickRandomMessage([...COMMENTARY_MESSAGES.MOOD.BORED]);
      case ReadingMood.NEUTRAL:
        return pickRandomMessage([...COMMENTARY_MESSAGES.MOOD.NEUTRAL]);
      default:
        return COMMENTARY_MESSAGES.DEFAULT;
    }
  }

  // ======================================================
  // [추가 1] Mood가 없을 때의 Fallback 로직
  // ======================================================
  if (history.readingMinutes >= 240) {
    return COMMENTARY_MESSAGES.FALLBACK.LONG_MARATHON;
  }
  if (endHour >= 23 && startHour > 20) {
    return COMMENTARY_MESSAGES.FALLBACK.LATE_FINISH;
  }
  if (startHour >= 21) {
    return COMMENTARY_MESSAGES.FALLBACK.LATE_NIGHT;
  }
  if (startHour >= 5 && startHour < 9) {
    return pickRandomMessage([...COMMENTARY_MESSAGES.FALLBACK.EARLY_MORNING]);
  }
  if (startHour >= 12 && startHour < 14) {
    return COMMENTARY_MESSAGES.FALLBACK.LUNCH_TIME;
  }

  return COMMENTARY_MESSAGES.DEFAULT;
};
