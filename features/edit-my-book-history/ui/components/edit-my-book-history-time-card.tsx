import { useFormContext } from 'react-hook-form';

import { EditMyBookHistoryType } from '@/entities/my-book-history';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { ErrorMessage } from '@/shared/ui/error-message';

import { EditMyBookHistoryTimeContainer } from '../containers';

export function EditMyBookHistoryTimeCard() {
  const {
    formState: { errors },
  } = useFormContext<EditMyBookHistoryType>();

  return (
    <Card className="gap-2 hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <CardTitle>독서 시간 수정</CardTitle>
      </CardHeader>
      <CardContent>
        <EditMyBookHistoryTimeContainer />
      </CardContent>
      <CardFooter className="flex-col">
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
      </CardFooter>
    </Card>
  );
}
