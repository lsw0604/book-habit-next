import { useParams } from 'next/navigation';
import { Control, Controller } from 'react-hook-form';

import Rating from '@/components/common/rating';
import Select from '@/components/common/select';
import { ErrorMessage } from '@/components/common/error-message';

import useAutoSubmit from '@/hooks/useAutoSubmit';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import useSuccessHandler from '@/hooks/success/useSuccessHandler';
import useMyBookUpdateForm from '@/hooks/my-book/useMyBookUpdateForm';
import useMyBookUpdateFormSubmit from '@/hooks/my-book/useMyBookUpdateFormSubmit';
import { MyBookUpdateSchemaType } from '@/schemas/my-book-update.schema';
import { MY_BOOK_ITEM_STATUS } from '@/constant/my-book-item';

interface MyBookFormProps {
  myBookStatus: MyBookStatusType;
  rating: number;
}

export default function MyBookForm({ myBookStatus, rating }: MyBookFormProps) {
  const { my_book_id } = useParams();
  const myBookId = Number(my_book_id);

  const { control, watch } = useMyBookUpdateForm({ myBookStatus, rating });
  const { onSubmit, isSuccess, isError, error } = useMyBookUpdateFormSubmit();

  useErrorHandler(isError, error);
  useSuccessHandler({ isSuccess, message: 'MyBook 업데이트 성공' });
  useAutoSubmit<MyBookUpdateSchemaType>({
    watch,
    onSubmit: (data) => {
      onSubmit({ data, myBookId });
    },
    dependencies: [myBookId, myBookStatus, rating],
  });

  return (
    <form className="flex gap-2 w-full">
      <MyBookStatusController control={control} />
      <MyBookRatingController control={control} />
    </form>
  );
}

interface MyBookControllerProps {
  control: Control<MyBookUpdateSchemaType>;
}

const MyBookRatingController = ({ control }: MyBookControllerProps) => {
  return (
    <Controller
      control={control}
      name="rating"
      render={({ field: { value, onChange }, formState: { errors } }) => (
        <>
          <Rating rating={value as number} onChange={onChange} />
          {!!errors?.rating?.message && (
            <ErrorMessage>{errors.rating.message}</ErrorMessage>
          )}
        </>
      )}
    />
  );
};

const MyBookStatusController = ({ control }: MyBookControllerProps) => {
  return (
    <Controller
      control={control}
      name="myBookStatus"
      render={({ field: { value, onChange }, formState: { errors } }) => (
        <>
          <Select.ErrorBoundary>
            <Select value={value as MyBookStatusType} onChange={onChange}>
              <Select.Trigger>
                <span className="line-clamp-1">
                  {
                    MY_BOOK_ITEM_STATUS.find((status) => status.value === value)
                      ?.label
                  }
                </span>
              </Select.Trigger>
              <Select.Content>
                {MY_BOOK_ITEM_STATUS.map((status) => (
                  <Select.Option key={status.value} value={status.value}>
                    {status.label}
                  </Select.Option>
                ))}
              </Select.Content>
            </Select>
          </Select.ErrorBoundary>
          {!!errors?.myBookStatus?.message && (
            <ErrorMessage>{errors.myBookStatus.message}</ErrorMessage>
          )}
        </>
      )}
    />
  );
};
