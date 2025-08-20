/**
 * 객체 타입 T에서 특정 키(K)들의 타입을 새로운 타입(TNew)으로 교체하는 유틸리티 타입입니다.
 *
 * Omit을 사용하여 기존 타입 T에서 교체할 키 K들을 제거하고,
 * 교체될 키(P in K)에 새로운 타입 TNew를 할당하여 하나의 타입으로 합칩니다.
 * 이를 통해 객체 타입의 특정 속성 타입만 손쉽게 변경할 수 있습니다.
 *
 * @template T - 속성 타입을 교체할 원본 객체 타입
 * @template K - T 타입에서 타입을 교체할 키들의 유니언 타입 (예: 'key1' | 'key2')
 * @template TNew - 키 K에 새롭게 할당될 단일 타입
 *
 * @example
 * // Date 타입을 string으로 변환하는 예시
 * interface User {
 * id: number;
 * name: string;
 * createdAt: Date;
 * updatedAt: Date;
 * }
 *
 * // User 타입에서 'createdAt'과 'updatedAt' 키의 타입을 string으로 교체합니다.
 * type SerializableUser = Replace<User, 'createdAt' | 'updatedAt', string>;
 *
 * // 결과 타입:
 * // {
 * //   id: number;
 * //   name: string;
 * //   createdAt: string;
 * //   updatedAt: string;
 * // }
 */
export type Replace<T, K extends keyof T, TNew> = Omit<T, K> & {
  [P in K]: TNew;
};
