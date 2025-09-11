import { ReadingMood } from '../model';

export const DEFAULT_STYLE = {
  bgColor: 'bg-white dark:bg-gray-800',
  textColor: 'text-gray-800 dark:text-gray-200',
  borderColor: 'border-gray-200 dark:border-gray-600',
};

/**
 * 부정적/중립적 감정을 위한 공통 스타일
 */
const NEUTRAL_MOOD_STYLE = {
  bgColor: 'bg-gray-100 dark:bg-gray-700',
  textColor: 'text-gray-600 dark:text-gray-300',
  borderColor: 'border-gray-300 dark:border-gray-500',
};

/**
 * 독서 기록에 따른 모든 스타일 정의
 */
export const COMMENTARY_COLOR_MAP = {
  // 1. 최우선 순위 특별 케이스
  SPECIAL_CASES: {
    OVERNIGHT_READING: {
      // 밤샘 독서: 깊은 밤하늘 테마
      bgColor: 'bg-slate-800',
      textColor: 'text-slate-200',
      borderColor: 'border-slate-600',
    },
    GREETING_THE_DAWN: {
      // 새벽을 맞이하며: 여명 테마
      bgColor: 'bg-amber-100 dark:bg-amber-900',
      textColor: 'text-amber-800 dark:text-amber-200',
      borderColor: 'border-amber-400 dark:border-amber-700',
    },
  },
  // 2. 이스터 에그
  EASTER_EGGS: {
    THOUGHTFUL_NIGHT: {
      // 깊은 생각에 잠긴 밤: 차분하고 진한 남색 테마
      bgColor: 'bg-indigo-900',
      textColor: 'text-indigo-100',
      borderColor: 'border-indigo-700',
    },
    EXCITED_WEEKEND: {
      // 신나는 주말 독서: 활기찬 오렌지 테마
      bgColor: 'bg-orange-100 dark:bg-orange-900',
      textColor: 'text-orange-800 dark:text-orange-200',
      borderColor: 'border-orange-400 dark:border-orange-600',
    },
  },
  // 3. Mood 기반 스타일
  MOOD: {
    [ReadingMood.EXCITED]: {
      // 신나요: 밝은 노랑
      bgColor: 'bg-yellow-100 dark:bg-yellow-900',
      textColor: 'text-yellow-800 dark:text-yellow-200',
      borderColor: 'border-yellow-400 dark:border-yellow-600',
    },
    [ReadingMood.INSPIRED]: {
      // 영감받았어요: 창의적인 보라
      bgColor: 'bg-purple-100 dark:bg-purple-900',
      textColor: 'text-purple-800 dark:text-purple-200',
      borderColor: 'border-purple-400 dark:border-purple-600',
    },
    [ReadingMood.EMOTIONAL]: {
      // 감동적이에요: 감성적인 파랑
      bgColor: 'bg-blue-100 dark:bg-blue-900',
      textColor: 'text-blue-800 dark:text-blue-200',
      borderColor: 'border-blue-400 dark:border-blue-600',
    },
    [ReadingMood.THOUGHTFUL]: {
      // 생각이 많아져요: 차분한 회색-파랑
      bgColor: 'bg-slate-100 dark:bg-slate-700',
      textColor: 'text-slate-800 dark:text-slate-200',
      borderColor: 'border-slate-400 dark:border-slate-500',
    },
    [ReadingMood.ENLIGHTENED]: {
      // 깨달았어요: 밝은 하늘색
      bgColor: 'bg-sky-100 dark:bg-sky-900',
      textColor: 'text-sky-800 dark:text-sky-200',
      borderColor: 'border-sky-400 dark:border-sky-600',
    },
    [ReadingMood.SATISFIED]: {
      // 만족스러워요: 편안한 초록
      bgColor: 'bg-green-100 dark:bg-green-900',
      textColor: 'text-green-800 dark:text-green-200',
      borderColor: 'border-green-400 dark:border-green-600',
    },
    [ReadingMood.INTRIGUED]: {
      // 흥미진진해요: 호기심을 자극하는 청록
      bgColor: 'bg-teal-100 dark:bg-teal-900',
      textColor: 'text-teal-800 dark:text-teal-200',
      borderColor: 'border-teal-400 dark:border-teal-600',
    },
    [ReadingMood.CHALLENGED]: {
      // 어려웠어요: 도전적인 빨강
      bgColor: 'bg-red-100 dark:bg-red-900',
      textColor: 'text-red-800 dark:text-red-200',
      borderColor: 'border-red-400 dark:border-red-600',
    },
    // 아래 감정들은 공통 스타일을 사용
    [ReadingMood.DISAPPOINTED]: NEUTRAL_MOOD_STYLE,
    [ReadingMood.CONFUSED]: NEUTRAL_MOOD_STYLE,
    [ReadingMood.BORED]: NEUTRAL_MOOD_STYLE,
    [ReadingMood.NEUTRAL]: NEUTRAL_MOOD_STYLE,
  },
};
