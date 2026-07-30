/**
 * Intersection Observer API에 사용되는 옵션들의 인터페이스입니다.
 */
export interface IntersectionOptions {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number;
}

/**
 * Intersection Observer API에 사용되는 기본 옵션을 생성합니다.
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
