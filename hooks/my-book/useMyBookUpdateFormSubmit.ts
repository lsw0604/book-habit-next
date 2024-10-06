import { useEffect } from 'react';
import { useDebounceCallback } from 'usehooks-ts';
import useErrorHandler from '@/hooks/error/useErrorHandler';
import useMyBookMutation from '@/queries/my-book/useMyBookMutation';
import useToastHook from '@/hooks/toast/useToastHook';
import { MyBookUpdateSchemaType } from '@/schemas/my-book-update-schema';

interface MyBookUpdateFormSubmitProps {
  data: MyBookUpdateSchemaType;
  myBookId: number;
}

export default function useMyBookUpdateFormSubmit() {
  const { updateMyBook } = useMyBookMutation();
  const { mutate, isSuccess, isError, error, isPending } = updateMyBook();
  const { successToast } = useToastHook();

  const onSubmit = useDebounceCallback(
    ({ data, myBookId }: MyBookUpdateFormSubmitProps) => {
      console.log(data);
      mutate({
        myBookId,
        myBookStatus: data.myBookStatus,
        rating: data.rating,
      });
    },
    300
  );

  useEffect(() => {
    if (isSuccess) {
      successToast('MyBook 업데이트 성공');
    }
  }, [isSuccess]);

  useErrorHandler(isError, error);

  return {
    onSubmit,
    isPending,
  };
}
