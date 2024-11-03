'use client';

import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ErrorMessage } from '@/components/common/error-message';
import { RangeDatePicker } from '@/components/common/date-picker';
import useAutoSubmit from '@/hooks/form/useAutoSubmit';
import usePublicCommentParamsForm from '@/hooks/form/public-comment/usePublicCommentParamsForm';
import usePublicCommentRouter from '@/hooks/public-comment/usePublicCommentRouter';
import usePublicCommentParams from '@/hooks/public-comment/usePublicCommentParams';
import { publicCommentParamsSchemaType } from '@/hooks/form/public-comment/schema/params.schema';
import { cn } from '@/utils/class-name';

export default function CommentForm() {
  const publicCommentParams = usePublicCommentParams();
  const { control, watch } = usePublicCommentParamsForm(publicCommentParams);
  const { pushToPublicComment } = usePublicCommentRouter();

  useAutoSubmit<publicCommentParamsSchemaType>({
    watch,
    onSubmit: useDebounceCallback((data) => {
      pushToPublicComment(data);
    }, 500),
    dependencies: [watch, pushToPublicComment],
  });

  return (
    <form
      className={cn(
        'flex flex-col p-4 relative gap-2 min-w-80 max-w-96', // 기본 스타일
        'border-gray-300 border-b shadow-sm rounded-lg' // 테두리 스타일
      )}
    >
      <DateController control={control} />
      <SizeController control={control} />
    </form>
  );
}

interface ControllerProps {
  control: Control<publicCommentParamsSchemaType>;
}

const SizeController: React.FC<ControllerProps> = ({ control }) => {
  return (
    <Controller
      name="pageSize"
      control={control}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="px-4 w-full">
          <Label className="text-sm font-bold">
            페이지 크기{' '}
            <span className="text-lg font-normal text-foreground">{value}</span>
          </Label>
          <Slider
            className="my-4"
            value={[value]}
            step={10}
            min={10}
            max={50}
            onValueChange={(val) => onChange(val[0])}
          />
          {error?.message && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
      )}
    />
  );
};

const DateController: React.FC<ControllerProps> = ({ control }) => {
  return (
    <Controller
      name="startDate"
      control={control}
      render={({
        field: { value: startDate, onChange: onChangeStartDate },
        fieldState: { error: startDateError },
      }) => (
        <Controller
          name="endDate"
          control={control}
          render={({
            field: { value: endDate, onChange: onChangeEndDate },
            fieldState: { error: endDateError },
          }) => (
            <>
              <RangeDatePicker
                numberOfMonths={1}
                date={{ from: startDate, to: endDate }}
                setDate={(newValue) => {
                  if (newValue?.from) onChangeStartDate(newValue.from);
                  if (newValue?.to) onChangeEndDate(newValue.to);
                }}
              />
              {startDateError?.message && (
                <ErrorMessage>{startDateError.message}</ErrorMessage>
              )}
              {endDateError?.message && (
                <ErrorMessage>{endDateError.message}</ErrorMessage>
              )}
            </>
          )}
        />
      )}
    />
  );
};
