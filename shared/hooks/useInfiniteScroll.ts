'use client';

import { useEffect, useCallback } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

/**
 * Intersection Observer API에 사용되는 옵션들의 인터페이스 입니다.
 * @interface IntersectionOptions
 * @property {Element | Document | null} [root] - 대상 객체의 가시성을 확인할 때 사용되는 뷰포트 요소. 기본값은 브라우저 뷰포트입니다.
 * @property {string} [rootMargin] - 대상 객체의 가시성을 확인할 때 사용되는 뷰포트 요소의 여백. 기본값은 '20px'입니다.
 * @property {number} [threshold] - 대상 객체의 가시성을 확인할 때 사용되는 뷰포트 요소의 뷰포트 비율. 기본값은 1.0입니다.
 */
export interface IntersectionOptions {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number;
}

/**
 * Intersection Observer API에 사용되는 기본 옵션을 생성합니다.
 * @function createIntersectionOptions
 * @param {Partial<IntersectionOptions>} [customOptions={}] - 기본 옵션을 덮어쓸 사용자 정의 옵션.
 * @returns {IntersectionOptions} 기본 옵션과 사용자 정의 옵션이 병합된 최종 옵션 객체.
 */
export const createIntersectionOptions = (
  customOptions: Partial<IntersectionOptions> = {}
): IntersectionOptions => {
  const defaultOptions: IntersectionOptions = {
    root: null,
    rootMargin: '20px',
    threshold: 1.0,
  };

  return {
    ...defaultOptions,
    ...customOptions,
  };
};

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

/**
 * 무한 스크롤 구현을 위한 훅입니다.
 * @function useInfiniteScroll
 * @param {() => void} fetchNextPage - 다음 페이지를 불러오는 함수
 * @param {boolean} hasNextPage - 다음 페이지가 있는지 여부
 * @param {Partial<IntersectionOptions>} [options] - 가시성 감지에 사용할 옵션
 * @returns {(node: Element | null) => void} 참조 설정 함수
 */
export const useInfiniteScroll = (
  fetchNextPage: () => void,
  hasNextPage: boolean,
  options?: Partial<IntersectionOptions>
) => {
  const { isIntersecting, ref } = useIntersectionObserver(
    createIntersectionOptions({ threshold: 0.5, ...options })
  );

  const handleFetch = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      handleFetch();
    }
  }, [isIntersecting, hasNextPage, handleFetch]);

  return ref;
};

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
  const { ref, isIntersecting } = useIntersectionObserver(
    createIntersectionOptions(options)
  );

  useEffect(() => {
    if (isIntersecting) {
      action();
    }
  }, [isIntersecting, action]);

  return ref;
};

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
