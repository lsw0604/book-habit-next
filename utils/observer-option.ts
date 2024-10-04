/**
 * Intersection Observer API에 사용되는 옵션들의 인터페이스 입니다.
 * @interface ObserverOption
 * @property {Element | Document | null} [root] - 대상 객체의 가시성을 확인할 때 사용되는 뷰포트 요소. 기본값은 브라우저 뷰포트입니다.
 * @property {string} [rootMargin] - 대상 객체의 가시성을 확인할 때 사용되는 뷰포트 요소의 여백. 기본값은 '20px'입니다.
 * @property {number} [threshold] - 대상 객체의 가시성을 확인할 때 사용되는 뷰포트 요소의 뷰포트 비율. 기본값은 1.0입니다.
 */
interface ObserverOption {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number;
}

/**
 * * Intersection Observer API에 사용할 옵션 객체를 생성합니다.
 * @function createObserverOption
 * @param {Partial<ObserverOptions>} [options={}] - 기본 옵션을 덮어쓸 사용자 정의 옵션.
 * @returns {ObserverOptions} 기본 옵션과 사용자 정의 옵션이 병합된 최종 옵션 객체.
 *
 * * 기본 옵션 사용
 * @example
 * const defaultOptions = createObserverOption();
 *
 * * threshold만 변경
 * @example
 * const customOptions = createObserverOption({ threshold: 0.5 });
 *
 * * 여러 옵션 변경
 * @example
 * const multipleOptions = createObserverOption({ rootMargin: '10px', threshold: [0, 0.5, 1] });
 */
export const observerOption = (
  option: Partial<ObserverOption> = {}
): ObserverOption => {
  const defaultOption: ObserverOption = {
    root: null,
    rootMargin: '20px',
    threshold: 1.0,
  };

  return {
    ...defaultOption,
    ...option,
  };
};
