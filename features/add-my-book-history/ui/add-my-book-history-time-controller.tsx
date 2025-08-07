import { Controller } from 'react-hook-form';

import { InputTimepicker } from '@/shared/ui/input-timepicker';

import { AddMyBookHistoryControllerProps } from '../model/types';

export default function AddMyBookHistoryTimeController({
  control,
}: AddMyBookHistoryControllerProps) {
  return (
    <div className="w-full h-auto my-2 p-4 rounded-lg border-none shadow-lg flex items-center justify-center hover:shadow-2xl bg-white/50 backdrop-blur-sm transition-shadow duration-200">
      <div className="flex flex-col gap-4 w-full h-36">
        <Controller
          control={control}
          name="startTime"
          render={({ field, formState: { errors } }) => (
            <InputTimepicker
              onChange={field.onChange}
              value={field.value}
              label="독서 시작 시간"
              errorMessage={errors.startTime?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="endTime"
          render={({ field, formState: { errors } }) => (
            <InputTimepicker
              onChange={field.onChange}
              value={field.value}
              label="독서 종료 시간"
              errorMessage={errors.endTime?.message}
            />
          )}
        />
      </div>
    </div>
  );
}
