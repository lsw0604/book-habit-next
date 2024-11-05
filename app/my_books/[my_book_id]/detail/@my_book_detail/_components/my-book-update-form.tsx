import { useDebounceCallback } from 'usehooks-ts';
import { Control, Controller } from 'react-hook-form';

import Rating from '@/components/common/rating';
import Select from '@/components/common/select';
import { ErrorMessage } from '@/components/common/error-message';

import { useMyBookMutation } from '@/service/my-book/useMyBookService';
import useAutoSubmit from '@/hooks/form/useAutoSubmit';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import useSuccessHandler from '@/hooks/success/useSuccessHandler';
import useMyBookUpdateForm from '@/hooks/form/my-book/useMyBookUpdateForm';
import { MyBookUpdateSchemaType } from '@/hooks/form/my-book/schema/update.schema';
import { MY_BOOK_ITEM_STATUS } from '@/constant/my-book-item';

interface MyBookFormProps {
  data: Pick<ResponseGetMyBookDetail, 'status' | 'rating'>;
  myBookId: number;
}

interface SchemaProps extends MyBookUpdateSchemaType {
  myBookId: number;
}

export default function MyBookUpdateForm({ data, myBookId }: MyBookFormProps) {
  const { control, watch } = useMyBookUpdateForm(data);
  const {
    updateMyBook: { mutate, isSuccess, isError, error },
  } = useMyBookMutation();

  const onSubmit = useDebounceCallback((payload: SchemaProps) => {
    mutate(payload);
  }, 300);

  useAutoSubmit<MyBookUpdateSchemaType>({
    watch,
    onSubmit: (data) => {
      onSubmit({ ...data, myBookId });
    },
    dependencies: [myBookId, data],
  });
  useErrorHandler(isError, error);
  useSuccessHandler({ isSuccess, message: 'MyBook 업데이트 성공' });

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
      name="status"
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
          {!!errors?.status?.message && (
            <ErrorMessage>{errors.status.message}</ErrorMessage>
          )}
        </>
      )}
    />
  );
};
