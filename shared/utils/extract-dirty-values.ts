import { FieldValues } from 'react-hook-form';

type DirtyFields<T> = Partial<Readonly<Record<keyof T, boolean>>>;

/**
 * react-hook-form의 데이터와 dirtyFields 상태를 기반으로,
 * 실제로 변경된 필드의 값만 추출하여 객체로 반환합니다.
 *
 * @template T - 폼의 필드 값 타입을 나타내는 제네릭.
 * @param {T} data - react-hook-form의 `getValues()` 또는 `watch()`로 얻은 전체 데이터.
 * @param {DirtyFields<T>} dirtyFields - `formState.dirtyFields`에서 얻은 객체.
 * @param {(keyof T)[]} allowedFields - 반환 객체에 포함할 수 있는 필드 이름의 배열.
 * @returns {Partial<T>} 변경된 필드만 포함하는 부분 객체.
 */
export function extractDirtyValues<T extends FieldValues>(
  data: T,
  dirtyFields: DirtyFields<T>,
  allowedFields: (keyof T)[]
): Partial<T> {
  return allowedFields
    .filter(field => dirtyFields[field] && data[field] !== undefined)
    .reduce((acc, field) => {
      acc[field] = data[field];
      return acc;
    }, {} as Partial<T>);
}
