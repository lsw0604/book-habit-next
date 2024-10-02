import { Controller } from 'react-hook-form';

import Rating from '@/components/common/rating';
import ErrorMessage from '@/components/common/error-message';
import usePutMyBookForm from '@/hooks/my-book-detail/usePutMyBookForm';
import useMutationPutMyBookDetail from '@/queries/my-book-detail/useMutationPutMyBookDetail';
import { MyBookUpdateSchemaType } from '@/schemas/my-book-update-schema';
import { useDebounceCallback } from 'usehooks-ts';
import { useEffect } from 'react';
import useToastHook from '@/hooks/toast/useToastHook';
import { queryClient } from '@/queries';
import { queryKeys } from '@/constant/queries-key';

interface MyBookRatingProps {
  myBookId: number;
  rating: number;
}

export default function MyBookRating({ myBookId, rating }: MyBookRatingProps) {
  const { control, watch } = usePutMyBookForm({ rating });
  const { mutate, isSuccess } = useMutationPutMyBookDetail({
    myBookId,
    rating,
  });
  const { successToast } = useToastHook();

  const onSubmit = useDebounceCallback(
    (data: Partial<MyBookUpdateSchemaType>) => {
      mutate({ myBookId, ...data });
    },
    300
  );

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
      successToast('Rating 업데이트 성공');
      queryClient.invalidateQueries({ queryKey: [queryKeys.myBook.getList] });
    }
  }, [isSuccess]);

  return (
    <Controller
      control={control}
      name="rating"
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <Rating rating={value} onChange={onChange} />
          {!!error?.message && <ErrorMessage message={error.message} />}
        </>
      )}
    />
  );
}
