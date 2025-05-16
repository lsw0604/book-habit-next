import type { MyBookUpdateFormProps } from '../model';
import { useAutoSubmit } from '@/shared/hooks/form';
import MyBookUpdateRatingController from './my-book-update-rating-controller';
import MyBookUpdateStatusController from './my-book-update-status-controller';
import {
  useUpdateMyBookForm,
  useUpdateMyBookFormSubmit,
} from '@/features/update-my-book/lib/hooks';
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
    <form className="flex gap-2 w-full">
      <MyBookUpdateRatingController control={control} />
      <MyBookUpdateStatusController control={control} />
    </form>
  );
}
