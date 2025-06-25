import type { MyBookUpdateFormProps } from './types';
import { useAutoSubmit } from '@/shared/hooks/form';
import MyBookUpdateRatingController from './my-book-update-rating-controller';
import MyBookUpdateStatusController from './my-book-update-status-controller';
import {
  useUpdateMyBookForm,
  useUpdateMyBookFormSubmit,
} from '@/features/update-my-book/hooks';
import { UpdateMyBookType } from '@/features/update-my-book/model/schema';

export default function MyBookUpdateForm({
  data,
  myBookId,
}: MyBookUpdateFormProps) {
  const { control, watch } = useUpdateMyBookForm({ ...data });
  const { onSubmit } = useUpdateMyBookFormSubmit(myBookId);

  useAutoSubmit<UpdateMyBookType>({
    watch,
    onSubmit,
    dependencies: [myBookId, data],
  });

  return (
    <form className="flex flex-col gap-2 w-full mt-auto">
      <MyBookUpdateStatusController control={control} />
      <MyBookUpdateRatingController control={control} />
    </form>
  );
}
