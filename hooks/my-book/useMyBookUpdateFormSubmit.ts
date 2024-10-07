import { useDebounceCallback } from 'usehooks-ts';
import useMyBookMutation from '@/queries/my-book/useMyBookMutation';
import { MyBookUpdateSchemaType } from '@/schemas/my-book-update-schema';

interface MyBookUpdateFormSubmitProps {
  data: MyBookUpdateSchemaType;
  myBookId: number;
}

export default function useMyBookUpdateFormSubmit() {
  const { updateMyBook } = useMyBookMutation();
  const { mutate, isSuccess, isError, error } = updateMyBook();

  const onSubmit = useDebounceCallback(
    ({ data, myBookId }: MyBookUpdateFormSubmitProps) => {
      mutate({
        myBookId,
        myBookStatus: data.myBookStatus,
        rating: data.rating,
      });
    },
    300
  );

  return {
    onSubmit,
    isSuccess,
    isError,
    error,
  };
}
