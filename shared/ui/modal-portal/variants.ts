/** 모바일: 아래에서 올라오는 바텀 시트 */
export const MODAL_VARIANT = {
  initial: {
    opacity: 0,
    y: '100%',
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 120,
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    y: '100%',
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 120,
      duration: 0.3,
    },
  },
} as const;

/** PC: 화면 중앙에서 살짝 떠오르는 다이얼로그 */
export const DESKTOP_MODAL_VARIANT = {
  initial: {
    opacity: 0,
    scale: 0.96,
    y: 12,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 26,
      stiffness: 260,
      duration: 0.25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 12,
    transition: {
      type: 'spring',
      damping: 26,
      stiffness: 260,
      duration: 0.2,
    },
  },
} as const;

export const BACKDROP_VARIANT = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 0.6,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
} as const;
