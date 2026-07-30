'use client';

import { useIntersectionObserver } from 'usehooks-ts';
import { createIntersectionOptions, type IntersectionOptions } from './types';

/**
 * 요소의 가시성을 관찰하는 훅입니다.
 * @function useVisibilityObserver
 * @param {Partial<IntersectionOptions>} [options] - 가시성 감지에 사용할 옵션
 * @returns { ref: (node: Element | null) => void; isVisible: boolean; isIntersecting: boolean } 참조 설정 함수, 가시성 상태
 */
export const useVisibilityObserver = (
  options?: Partial<IntersectionOptions>
) => {
  const { ref, isIntersecting, entry } = useIntersectionObserver(
    createIntersectionOptions(options)
  );

  return {
    ref,
    isVisible: isIntersecting,
    isIntersecting,
    entry,
  };
};
