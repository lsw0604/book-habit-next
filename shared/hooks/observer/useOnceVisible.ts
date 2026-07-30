'use client';

import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';
import { createIntersectionOptions, type IntersectionOptions } from './types';

/**
 * 요소가 화면에 나타날 때 한 번만 액션을 실행하는 훅입니다.
 * @function useOnceVisible
 * @param {() => void} action - 요소가 보일 때 실행할 함수
 * @param {Partial<IntersectionOptions>} [options] - 가시성 감지에 사용할 옵션
 * @returns {(node: Element | null) => void} 참조 설정 함수
 */
export const useOnceVisible = (
  action: () => void,
  options?: Partial<IntersectionOptions>
) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    ...createIntersectionOptions(options),
    freezeOnceVisible: true,
  });

  const hasFired = useRef(false);

  useEffect(() => {
    if (isIntersecting && !hasFired.current) {
      action();
      hasFired.current = true;
    }
  }, [isIntersecting, action]);

  return ref;
};
