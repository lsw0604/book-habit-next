'use client';

import { useVisibilityObserver } from './useVisibilityObserver';
import type { IntersectionOptions } from './types';

/**
 * 지연 로딩을 구현하기 위한 훅입니다.
 * @function useLazyLoading
 * @param {Partial<IntersectionOptions>} [options] - 가시성 감지에 사용할 옵션
 * @returns {{ ref: (node: Element | null) => void; isLoaded: boolean }} 참조 설정 함수와 로딩 상태
 */
export const useLazyLoading = (options?: Partial<IntersectionOptions>) => {
  const { ref, isVisible } = useVisibilityObserver(options);

  return {
    ref,
    isLoaded: isVisible,
  };
};
