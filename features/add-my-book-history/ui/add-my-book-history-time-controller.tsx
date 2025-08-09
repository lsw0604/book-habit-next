import { differenceInMinutes } from 'date-fns';
import { Controller, UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import { InputTimepicker } from '@/shared/ui/input-timepicker';

import { AddMyBookHistoryType } from '../model/schema';
import { AddMyBookHistoryControllerProps } from '../model/types';

export default function AddMyBookHistoryTimeController({
  control,
  setValue,
  getValues,
}: AddMyBookHistoryControllerProps & {
  setValue: UseFormSetValue<AddMyBookHistoryType>;
  getValues: UseFormGetValues<AddMyBookHistoryType>;
}) {
  const handleChange = (
    changeFieldName: 'startTime' | 'endTime',
    newValue: Date | undefined,
    onChange: (date: Date | undefined) => void
  ) => {
    onChange(newValue);

    const startTime =
      changeFieldName === 'startTime' ? newValue : getValues('startTime');
    const endTime =
      changeFieldName === 'endTime' ? newValue : getValues('endTime');

    if (startTime && endTime) {
      if (endTime < startTime) {
        setValue('readingMinutes', 0);
        return;
      }
      const diffInMinutes = differenceInMinutes(endTime, startTime);
      setValue('readingMinutes', Math.max(0, diffInMinutes), {
        shouldValidate: true,
      });
    }
  };

  return (
    <div className="w-full h-auto my-2 p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="flex flex-col gap-6">
        <Controller
          control={control}
          name="startTime"
          render={({ field, formState: { errors } }) => (
            <InputTimepicker
              onChange={newTime =>
                handleChange('startTime', newTime, field.onChange)
              }
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
              onChange={newTime =>
                handleChange('endTime', newTime, field.onChange)
              }
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
