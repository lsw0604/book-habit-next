import { type DependencyList, useEffect, useRef } from 'react';
import { type FieldValues, type UseFormWatch } from 'react-hook-form';

interface UseAutoSubmitProps<T extends FieldValues> {
  watch: UseFormWatch<T>;
  onSubmit: (data: T) => void;
  dependencies: DependencyList;
}

/**
 * react-hook-form의 필드 값이 변경될 때마다 자동으로 제출 로직을 실행하는 커스텀 훅입니다.
 *
 * @template {import('react-hook-form').FieldValues} T - 폼의 필드 값 타입을 나타내는 제네릭.
 *
 * @param {UseAutoSubmitProps<T>} props - 훅의 설정 객체.
 * @param {UseFormWatch<T>} props.watch - `react-hook-form`의 `watch` 함수입니다.
 * @param {(data: T) => void} props.onSubmit - 값이 변경될 때 제출 로직을 처리할 콜백 함수입니다. 최적화를 위해 `useCallback`으로 감싸는 것을 권장합니다.
 * @param {DependencyList} props.dependencies - `onSubmit` 외에, 변경 시 `watch`를 재구독해야 하는 외부 의존성 목록입니다.
 *
 * @example
 * ```jsx
 *  function AutoSaveForm({ currentUserId }) {
 *    const { watch } = useForm({ defaultValues: { name: '', email: '' } });
 *
 *    const handleAutoSubmit = useCallback((data) => {
 *      console.log('자동 저장 중...', data);
 *      // api.saveDraft(currentUserId, data);
 *    }, [currentUserId]); // currentUserId가 바뀌면 콜백도 새로 생성
 *
 *    useAutoSubmit({
 *      watch,
 *      onSubmit: handleAutoSubmit,
 *      dependencies: [currentUserId], // 이 값이 바뀌면 훅이 다시 설정됨
 *    });
 *
 *    return (
 *      // ... 폼 필드
 *    );
 *  }
 * ```
 */
export function useAutoSubmit<T extends FieldValues>({
  watch,
  onSubmit,
  dependencies,
}: UseAutoSubmitProps<T>) {
  // onSubmit 함수를 저장할 ref를 생성하여 항상 최신 함수를 참조하도록 합니다.
  const onSubmitRef = useRef(onSubmit);

  // onSubmit prop이 변경될 때마다 ref의 값을 최신으로 업데이트합니다.
  useEffect(() => {
    onSubmitRef.current = onSubmit;
  }, [onSubmit]);

  // watch 구독은 최초 렌더링과 dependencies 배열의 값이 변경될 때만 실행됩니다.
  useEffect(() => {
    const subscription = watch(data => {
      // ref에 저장된 최신 onSubmit 함수를 호출합니다.
      onSubmitRef.current(data as T);
    });

    return () => {
      subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, ...dependencies]);
}
