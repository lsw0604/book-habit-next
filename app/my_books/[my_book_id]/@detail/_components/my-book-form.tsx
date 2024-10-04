import { useEffect } from 'react';
import { Control, Controller } from 'react-hook-form';
import { useDebounceCallback } from 'usehooks-ts';

import Rating from '@/components/common/rating';
import Select from '@/components/common/select';
import ErrorMessage from '@/components/common/error-message';

import useToastHook from '@/hooks/toast/useToastHook';
import useMyBookUpdateForm from '@/hooks/my-book/useMyBookUpdateForm';
import useMyBookMutation from '@/queries/my-book/useMyBookMutation';
import { MyBookUpdateSchemaType } from '@/schemas/my-book-update-schema';
import { MY_BOOK_ITEM_STATUS } from '@/constant/my-book-item';

interface MyBookFormProps {
  myBookId: number;
  myBookStatus: MyBookStatusType;
  rating: number;
}

interface MyBookControllerProps {
  control: Control<MyBookUpdateSchemaType>;
}

export default function MyBookForm({
  myBookId,
  myBookStatus,
  rating,
}: MyBookFormProps) {
  const { control, watch } = useMyBookUpdateForm({ myBookStatus, rating });
  const { updateMyBook } = useMyBookMutation();
  const { mutate, isSuccess } = updateMyBook();
  const { successToast } = useToastHook();

  const onSubmit = useDebounceCallback((data: MyBookUpdateSchemaType) => {
    mutate({ myBookId, myBookStatus: data.myBookStatus, rating: data.rating });
  }, 300);

  useEffect(() => {
    const subscription = watch((data) => {
      onSubmit(data);
    });
    return () => {
      subscription.unsubscribe();
    };
  }, [watch, onSubmit]);

  useEffect(() => {
    if (isSuccess) {
      successToast('MyBook 업데이트 성공');
    }
  }, [isSuccess]);

  return (
    <form>
      <MyBookStatusController control={control} />
      <MyBookRatingController control={control} />
    </form>
  );
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
            <ErrorMessage message={errors.rating.message} />
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
      render={({ field: { value, onChange } }) => (
        <>
          <Select.ErrorBoundary>
            <Select value={value as MyBookStatusType} onChange={onChange}>
              <Select.Trigger>
                {
                  MY_BOOK_ITEM_STATUS.find((status) => status.value === value)
                    ?.label
                }
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
        </>
      )}
    />
  );
};

