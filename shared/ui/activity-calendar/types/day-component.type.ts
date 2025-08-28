/**
 * * 사용자가 직접 정의하여 `DayComponent` prop으로 전달하는 커스텀 컴포넌트의 props 타입입니다.
 * @template T - 각 날짜에 연결될 데이터의 타입입니다.
 */
export interface DayComponentProps<T> {
  readonly date: Date;
  readonly data?: readonly T[];
}
