import { Input } from '@/shared/ui/input';

import { AddMyBookHistoryRegisterProps } from '../model/types';

export default function AddMyBookHistoryPageController({
  register,
}: AddMyBookHistoryRegisterProps) {
  return (
    <div className="w-full h-auto my-2 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="flex flex-col gap-6">
        <Input
          label="독서 시작 페이지"
          id="startPage"
          type="number"
          inputMode="numeric"
          min={1}
          {...register('startPage', { valueAsNumber: true })}
        />
        <Input
          label="독서 종료 페이지"
          id="endPage"
          type="number"
          inputMode="numeric"
          {...register('endPage', { valueAsNumber: true })}
        />
      </div>
    </div>
  );
}
