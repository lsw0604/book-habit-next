import { FocusEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { Input } from '@/shared/ui/input';

import type { AddMyBookHistoryType } from '../../model/schema';

export default function AddMyBookHistoryPageStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<AddMyBookHistoryType>();

  const handleOnFocus = (e: FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className="w-full h-auto gap-6 my-2 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
      <Input
        label="독서 시작 페이지"
        id="startPage"
        type="number"
        inputMode="numeric"
        autoComplete="off"
        min={0}
        error={!!errors.startPage}
        errorMessage={errors.startPage?.message}
        onFocus={handleOnFocus}
        {...register('startPage', { valueAsNumber: true })}
      />
      <Input
        label="독서 종료 페이지"
        id="endPage"
        type="number"
        inputMode="numeric"
        autoComplete="off"
        min={0}
        error={!!errors.endPage}
        errorMessage={errors.endPage?.message}
        onFocus={handleOnFocus}
        {...register('endPage', { valueAsNumber: true })}
      />
    </div>
  );
}
