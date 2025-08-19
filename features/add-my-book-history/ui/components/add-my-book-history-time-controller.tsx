import { differenceInMinutes } from 'date-fns';
import { Controller, useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@/shared/ui/error-message';
import { InputTimepicker } from '@/shared/ui/input-timepicker';

import { AddMyBookHistoryType } from '../../model/schema';

export default function AddMyBookHistoryTimeController() {
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<AddMyBookHistoryType>();

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
    <div className="flex flex-col min-h-[168px] justify-center">
      <Controller
        control={control}
        name="startTime"
        render={({ field }) => (
          <InputTimepicker
            onChange={newTime =>
              handleChange('startTime', newTime, field.onChange)
            }
            className="mb-6"
            value={field.value}
            errorMessage={errors?.startTime?.message}
            label="독서 시작 시간"
          />
        )}
      />
      <Controller
        control={control}
        name="endTime"
        render={({ field }) => (
          <InputTimepicker
            onChange={newTime =>
              handleChange('endTime', newTime, field.onChange)
            }
            value={field.value}
            errorMessage={errors?.endTime?.message}
            label="독서 종료 시간"
          />
        )}
      />
      {!!errors.readingMinutes?.message && (
        <ErrorMessage>{errors.readingMinutes.message}</ErrorMessage>
      )}
    </div>
  );
}
