import { useFormContext } from 'react-hook-form';

import { AutoSizeTextarea } from '@/shared/ui/textarea';

import type { AddMyBookHistoryType } from '../../model/schema';

export default function AddMyBookHistoryMemoStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddMyBookHistoryType>();

  return (
    <div className="w-full h-auto my-2 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <AutoSizeTextarea
        label="메모를 남겨 보세요."
        id="memo"
        placeholder="여기에 메모를 입력하세요..."
        minHeight={160}
        isError={!!errors.memo?.message}
        errorMessage={errors.memo?.message}
        {...register('memo')}
      />
    </div>
  );
}
