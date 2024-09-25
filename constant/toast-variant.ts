/**
 * * 처음 0의 투명도 원래 위치보다 살짝 위에서 시작
 * * 0.5초 동안 1의 투명도 원래 위치로 이동
 * * 0.5초 동안 0의 투명도
 */
export const TOAST_VARIANT = {
  initial: {
    opacity: 0,
    y: -20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};
