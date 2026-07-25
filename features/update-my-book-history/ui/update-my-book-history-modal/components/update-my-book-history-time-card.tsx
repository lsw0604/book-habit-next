import { useFormContext } from 'react-hook-form';

import { ErrorMessage } from '@/shared/ui/error-message';

import { UpdateMyBookHistoryTimeContainer } from '../containers';

import type { UpdateMyBookHistoryType } from '../../../schema';

export function UpdateMyBookHistoryTimeCard() {
  const {
    formState: { errors },
  } = useFormContext<UpdateMyBookHistoryType>();

  return (
    <div className="border border-gray-200 rounded-lg p-4 space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center">
        독서 시간 수정
      </h3>
      <div>
        <UpdateMyBookHistoryTimeContainer />
      </div>
      <div className="flex flex-col gap-1">
        {errors.endTime?.message && (
          <ErrorMessage className="mr-auto">
            {errors.endTime.message}
          </ErrorMessage>
        )}
        {errors.startTime?.message && (
          <ErrorMessage className="mr-auto">
            {errors.startTime.message}
          </ErrorMessage>
        )}
        {errors.readingMinutes?.message && (
          <ErrorMessage className="mr-auto">
            {errors.readingMinutes.message}
          </ErrorMessage>
        )}
      </div>
    </div>
  );
}

