import type { FocusEvent } from 'react';

/**
 * 포커스된 input의 값을 전체 선택한다. (0으로 초기화된 숫자 입력을 덮어쓰기 쉽게)
 *
 * onFocus 안에서 `select()`를 곧바로 호출하면 안 된다.
 * 브라우저는 mousedown에서 포커스를 주고 mouseup에서 클릭 지점 기준으로 선택 범위를
 * 확정하는데, 그 사이에 스크립트가 전체 선택을 하면 두 동작이 겹쳐
 * 클릭한 곳부터 드래그한 듯한 어긋난 선택이 남는다. (macOS의 WebKit/Blink에서 특히 잘 보인다)
 *
 * 한 틱 미뤄 브라우저의 선택 처리가 끝난 뒤에 전체 선택한다.
 */
export const selectAllOnFocus = (e: FocusEvent<HTMLInputElement>) => {
  const { target } = e;
  setTimeout(() => target.select(), 0);
};
