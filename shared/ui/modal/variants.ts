export const MODAL_VARIANT = {
  initial: {
    opacity: 0,
    y: '100%',
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: '100%',
  },
  transition: {
    type: 'spring',
    damping: 20,
    stiffness: 100,
    duration: 0.5,
  },
} as const;

export const BACKDROP_VARIANT = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 0.6,
  },
  exit: {
    opacity: 0,
  },
  transition: {
    duration: 0.3,
  },
} as const;
