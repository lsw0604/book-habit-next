'use client';

import { differenceInMinutes, format } from 'date-fns';
import { ClockIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import type { AddMyBookHistoryType } from '@/entities/my-book-history';
import { InputTimepicker } from '@/shared/ui/input-timepicker';

export function AddMyBookHistoryTimeContainer() {
  const { watch, control, setValue } = useFormContext<AddMyBookHistoryType>();

  const [startTime, endTime, readingMinutes] = watch([
    'startTime',
    'endTime',
    'readingMinutes',
  ]);

  const formattedStartTime = format(startTime, 'HH시mm분');
  const formattedEndTime = format(endTime, 'HH시mm분');

  useEffect(() => {
    if (startTime && endTime) {
      if (endTime < startTime) {
        setValue('readingMinutes', 0, { shouldValidate: false });
        return;
      }
      const diffInMinutes = differenceInMinutes(endTime, startTime);
      setValue('readingMinutes', Math.max(0, diffInMinutes), {
        shouldValidate: false,
      });
    }
  }, [startTime, endTime, setValue]);

  return (
    <div className="flex flex-col min-h-[168px] justify-center gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="startTime"
          render={({ field, fieldState: { error } }) => (
            <InputTimepicker
              label="독서 시작 시간"
              onChange={field.onChange}
              value={field.value}
              isError={!!error}
              className="w-full"
            />
          )}
        />
        <Controller
          control={control}
          name="endTime"
          render={({ field, fieldState: { error } }) => (
            <InputTimepicker
              label="독서 종료 시간"
              onChange={field.onChange}
              value={field.value}
              isError={!!error}
              className="w-full"
            />
          )}
        />
      </div>
      <div className="mt-4 bg-muted border rounded-lg p-3">
        <div className="flex items-center gap-1.5 mb-1.5">
          <ClockIcon className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs font-medium text-foreground">
            총 독서 시간
          </span>
        </div>
        <p className="text-sm text-foreground line-clamp-2">
          {formattedStartTime} ~ {formattedEndTime} ({readingMinutes} 분)
        </p>
      </div>
    </div>
  );
}
