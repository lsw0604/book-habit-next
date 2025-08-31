import { FormProvider } from 'react-hook-form';

import { MyBookDetail } from '@/entities/my-book/model';
import { useAutoSubmit } from '@/shared/hooks/form';

import { useUpdateMyBookForm, useUpdateMyBookFormSubmit } from '../hooks';
import type { UpdateMyBookType } from '../schemas';

import {
  MyBookUpdateRatingController,
  MyBookUpdateStatusController,
} from './controller';

interface MyBookUpdateFormProps {
  data: Partial<Pick<MyBookDetail, 'rating' | 'status'>>;
  myBookId: number;
}

export function MyBookUpdateForm({ data, myBookId }: MyBookUpdateFormProps) {
  const { rating, status } = data;
  const { watch, ...methods } = useUpdateMyBookForm({ rating, status });
  const { onSubmit } = useUpdateMyBookFormSubmit(myBookId);

  useAutoSubmit<UpdateMyBookType>({
    watch,
    onSubmit,
    dependencies: [myBookId, data],
  });

  return (
    <FormProvider {...methods} watch={watch}>
      <form className="flex flex-col gap-2 w-full">
        <MyBookUpdateStatusController />
        <MyBookUpdateRatingController />
      </form>
    </FormProvider>
  );
}
