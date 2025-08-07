import { Input } from '@/shared/ui/input';

import { AddMyBookHistoryRegisterProps } from '../model/types';

export default function AddMyBookHistoryPageController({
  register,
}: AddMyBookHistoryRegisterProps) {
  return (
    <div className="w-full h-auto my-2 p-4 rounded-lg border-none shadow-lg flex items-center justify-center hover:shadow-2xl bg-white/50 backdrop-blur-sm transition-shadow duration-200">
      <div className="flex flex-col gap-4 w-full h-36">
        <Input
          label="독서 시작 페이지"
          id="startPage" // Label과 연결하기 위한 id 추가
          type="number" // 페이지는 숫자로 입력하도록 type 변경
          inputMode="tel"
          min={1}
          {...register('startPage', { valueAsNumber: true })}
        />
        <Input
          label="독서 종료 페이지"
          id="endPage" // Label과 연결하기 위한 id 추가
          type="number" // 페이지는 숫자로 입력하도록 type 변경
          {...register('endPage', { valueAsNumber: true })}
        />
      </div>
    </div>
  );
}
